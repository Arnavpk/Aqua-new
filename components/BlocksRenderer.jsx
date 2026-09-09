'use client';

/**
 * Renders Strapi rich text content — supports both:
 *   • Markdown strings (Strapi's Markdown editor)
 *   • Blocks JSON arrays (Strapi 5's Blocks editor)
 *
 * Usage:
 *   <BlocksRenderer content={block.body} />
 */

import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi/media';

/* ═══════════════════════════════════════════════════════════════════
   MARKDOWN STRING RENDERER
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Lightweight markdown-to-JSX. Covers the subset Strapi's markdown
 * editor actually produces: headings, bold, italic, links, images,
 * lists (ordered + unordered), blockquotes, code blocks, and <hr>.
 */
function parseMarkdown(md) {
    const lines = md.split('\n');
    const elements = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // blank line — skip
        if (line.trim() === '') {
            i++;
            continue;
        }

        // heading
        const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
        if (headingMatch) {
            const level = headingMatch[1].length;
            const text = headingMatch[2];
            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
            const Tag = `h${level}`;
            const headingClass = {
                1: 'text-[clamp(28px,4vw,42px)] font-bold tracking-tight leading-tight mt-8 mb-4',
                2: 'text-[clamp(22px,3vw,32px)] font-bold tracking-tight leading-snug mt-8 mb-3',
                3: 'text-[clamp(18px,2.5vw,24px)] font-semibold leading-snug mt-6 mb-2',
                4: 'text-[clamp(16px,2vw,20px)] font-semibold leading-snug mt-5 mb-2',
                5: 'text-base font-semibold mt-4 mb-1.5',
                6: 'text-sm font-semibold mt-4 mb-1',
            }[level] || '';
            elements.push(<Tag key={i} id={id} className={headingClass}>{inlineMarkdown(text)}</Tag>);
            i++;
            continue;
        }

        // hr
        if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
            elements.push(<hr key={i} />);
            i++;
            continue;
        }

        // code block
        if (line.trim().startsWith('```')) {
            const codeLines = [];
            i++;
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
                codeLines.push(lines[i]);
                i++;
            }
            i++; // skip closing ```
            elements.push(
                <pre key={`code-${i}`}>
                    <code>{codeLines.join('\n')}</code>
                </pre>
            );
            continue;
        }

        // blockquote
        if (line.startsWith('>')) {
            const quoteLines = [];
            while (i < lines.length && lines[i].startsWith('>')) {
                quoteLines.push(lines[i].replace(/^>\s?/, ''));
                i++;
            }
            elements.push(
                <blockquote key={`bq-${i}`}>
                    {quoteLines.map((ql, qi) => (
                        <p key={qi}>{inlineMarkdown(ql)}</p>
                    ))}
                </blockquote>
            );
            continue;
        }

        // unordered list
        if (/^[-*+]\s/.test(line)) {
            const items = [];
            while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
                items.push(lines[i].replace(/^[-*+]\s/, ''));
                i++;
            }
            elements.push(
                <ul key={`ul-${i}`}>
                    {items.map((item, li) => (
                        <li key={li}>{inlineMarkdown(item)}</li>
                    ))}
                </ul>
            );
            continue;
        }

        // ordered list
        if (/^\d+\.\s/.test(line)) {
            const items = [];
            while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
                items.push(lines[i].replace(/^\d+\.\s/, ''));
                i++;
            }
            elements.push(
                <ol key={`ol-${i}`}>
                    {items.map((item, li) => (
                        <li key={li}>{inlineMarkdown(item)}</li>
                    ))}
                </ol>
            );
            continue;
        }

        // image (standalone line)
        const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
        if (imgMatch) {
            elements.push(
                <figure key={`img-${i}`} className="my-6">
                    <img
                        src={imgMatch[2]}
                        alt={imgMatch[1]}
                        className="w-full rounded-lg"
                        loading="lazy"
                    />
                    {imgMatch[1] && (
                        <figcaption className="mt-2 text-center text-sm text-ink-2">
                            {imgMatch[1]}
                        </figcaption>
                    )}
                </figure>
            );
            i++;
            continue;
        }

        // paragraph — collect consecutive non-special lines
        const paraLines = [];
        while (
            i < lines.length &&
            lines[i].trim() !== '' &&
            !/^#{1,6}\s/.test(lines[i]) &&
            !/^[-*+]\s/.test(lines[i]) &&
            !/^\d+\.\s/.test(lines[i]) &&
            !lines[i].startsWith('>') &&
            !lines[i].trim().startsWith('```') &&
            !/^(-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i]) &&
            !/^!\[/.test(lines[i])
        ) {
            paraLines.push(lines[i]);
            i++;
        }
        if (paraLines.length > 0) {
            elements.push(
                <p key={`p-${i}`}>{inlineMarkdown(paraLines.join(' '))}</p>
            );
        }
    }

    return elements;
}

/**
 * Parse inline markdown: **bold**, *italic*, [links](url), `code`, ~~strike~~
 */
function inlineMarkdown(text) {
    if (!text) return text;

    // Regex matches inline patterns in priority order
    const pattern =
        /(\*\*(.+?)\*\*|__(.+?)__)|(\*(.+?)\*|_(.+?)_)|(~~(.+?)~~)|(`(.+?)`)|(\[([^\]]+)\]\(([^)]+)\))/g;

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = pattern.exec(text)) !== null) {
        // text before this match
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }

        if (match[1]) {
            // bold
            parts.push(<strong key={match.index}>{match[2] || match[3]}</strong>);
        } else if (match[4]) {
            // italic
            parts.push(<em key={match.index}>{match[5] || match[6]}</em>);
        } else if (match[7]) {
            // strikethrough
            parts.push(<s key={match.index}>{match[8]}</s>);
        } else if (match[9]) {
            // inline code
            parts.push(<code key={match.index}>{match[10]}</code>);
        } else if (match[11]) {
            // link
            parts.push(
                <a key={match.index} href={match[13]} target="_blank" rel="noopener noreferrer">
                    {match[12]}
                </a>
            );
        }

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
}

/* ═══════════════════════════════════════════════════════════════════
   BLOCKS JSON RENDERER (Strapi v5 Blocks editor)
   ═══════════════════════════════════════════════════════════════════ */

function renderInline(children = []) {
    if (!Array.isArray(children)) {
        return typeof children === 'string' ? children : null;
    }

    return children.map((child, i) => {
        if (child.type === 'link') {
            return (
                <a key={i} href={child.url} target="_blank" rel="noopener noreferrer">
                    {renderInline(child.children)}
                </a>
            );
        }

        let node = child.text ?? '';
        if (child.bold) node = <strong key={`b${i}`}>{node}</strong>;
        if (child.italic) node = <em key={`i${i}`}>{node}</em>;
        if (child.underline) node = <u key={`u${i}`}>{node}</u>;
        if (child.strikethrough) node = <s key={`s${i}`}>{node}</s>;
        if (child.code) node = <code key={`c${i}`}>{node}</code>;

        return <span key={i}>{node}</span>;
    });
}

function renderListItems(children = []) {
    return children.map((item, i) => {
        if (item.type === 'list') {
            const Tag = item.format === 'ordered' ? 'ol' : 'ul';
            return <Tag key={i}>{renderListItems(item.children)}</Tag>;
        }
        return <li key={i}>{renderInline(item.children)}</li>;
    });
}

function renderBlock(block, index) {
    switch (block.type) {
        case 'paragraph':
            return <p key={index}>{renderInline(block.children)}</p>;
        case 'heading': {
            const Tag = `h${block.level || 2}`;
            const text = block.children?.map((c) => c.text || '').join('') || '';
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            return <Tag key={index} id={id}>{renderInline(block.children)}</Tag>;
        }
        case 'list': {
            const Tag = block.format === 'ordered' ? 'ol' : 'ul';
            return <Tag key={index}>{renderListItems(block.children)}</Tag>;
        }
        case 'quote':
            return <blockquote key={index}>{renderInline(block.children)}</blockquote>;
        case 'code':
            return (
                <pre key={index}>
                    <code>{block.children?.map((c) => c.text).join('\n')}</code>
                </pre>
            );
        case 'image': {
            const src = block.image?.url ? getStrapiMedia(block.image) : null;
            if (!src) return null;
            return (
                <figure key={index} className="my-6">
                    <Image
                        src={src}
                        alt={block.image.alternativeText || ''}
                        width={block.image.width || 800}
                        height={block.image.height || 450}
                        className="w-full rounded-lg"
                    />
                    {block.image.caption && (
                        <figcaption className="mt-2 text-center text-sm text-ink-2">
                            {block.image.caption}
                        </figcaption>
                    )}
                </figure>
            );
        }
        default:
            return null;
    }
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT + UTILITIES
   ═══════════════════════════════════════════════════════════════════ */

export function BlocksRenderer({ content }) {
    if (!content) return null;

    // Markdown string
    if (typeof content === 'string') {
        return <>{parseMarkdown(content)}</>;
    }

    // Blocks JSON array
    if (Array.isArray(content)) {
        return <>{content.map((block, i) => renderBlock(block, i))}</>;
    }

    return null;
}

/**
 * Flatten content to plain text — works for both markdown strings
 * and blocks JSON. Used for search, meta descriptions, JSON-LD.
 */
export function blocksToText(content) {
    if (!content) return '';
    if (typeof content === 'string') return content.replace(/[#*_~`>\[\]()!-]/g, '').trim();
    if (!Array.isArray(content)) return '';

    return content
        .map((block) => {
            if (!block.children) return '';
            return block.children.map((c) => c.text || '').join('');
        })
        .filter(Boolean)
        .join('\n');
}

/**
 * Extract heading texts for a table of contents.
 * Works for both markdown strings and blocks JSON.
 */
export function blocksToToc(content) {
    if (!content) return [];

    // Markdown string
    if (typeof content === 'string') {
        const headings = [];
        for (const line of content.split('\n')) {
            const match = line.match(/^(#{1,6})\s+(.+)/);
            if (match) {
                const text = match[2].trim();
                headings.push({
                    text,
                    level: match[1].length,
                    id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
                });
            }
        }
        return headings;
    }

    // Blocks JSON
    if (Array.isArray(content)) {
        return content
            .filter((b) => b.type === 'heading')
            .map((b) => ({
                text: b.children?.map((c) => c.text || '').join('') || '',
                level: b.level || 2,
                id: (b.children?.map((c) => c.text || '').join('') || '')
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, ''),
            }));
    }

    return [];
}