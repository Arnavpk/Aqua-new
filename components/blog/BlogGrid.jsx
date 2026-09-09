'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { YearArchive } from './YearArchive';

export function BlogGrid({ blogs = [], base = '' }) {
    const [activeYear, setActiveYear] = useState(null);

    const filtered = useMemo(() => {
        if (!activeYear) return blogs;
        return blogs.filter((b) => b.year === activeYear);
    }, [blogs, activeYear]);

    return (
        <>
            <div className="section-head">
                <div>
                    <span className="eyebrow mb-3 block">All articles</span>
                    <h2 className="h1">Latest posts.</h2>
                </div>
            </div>

            <div className="grid grid-cols-[220px_1fr] gap-10 items-start max-[900px]:grid-cols-1 max-[900px]:gap-6">
                {/* Sidebar — sticky archive */}
                <aside className="sticky top-[110px] max-[900px]:static">
                    <YearArchive
                        blogs={blogs}
                        activeYear={activeYear}
                        onSelect={setActiveYear}
                    />
                </aside>

                {/* Cards */}
                <div>
                    {activeYear && (
                        <p className="mb-4 text-sm text-ink-2">
                            Showing {filtered.length} {filtered.length === 1 ? 'article' : 'articles'} from {activeYear}
                        </p>
                    )}

                    {filtered.length === 0 ? (
                        <div className="rounded-rx bg-white p-12 shadow-s2 text-center">
                            <div className="text-[48px] mb-4">📝</div>
                            <h3 className="h3 mb-2">
                                {activeYear
                                    ? `No posts from ${activeYear}`
                                    : 'No blog posts yet'}
                            </h3>
                            <p className="body-lg">
                                {activeYear
                                    ? 'Try selecting a different year or view all articles.'
                                    : 'Check back soon for tips, guides and park stories.'}
                            </p>
                        </div>
                    ) : (
                        <div className="blog-grid">
                            {filtered.map((blog) => (
                                <Link
                                    key={blog.slug}
                                    href={`${base}/about/blog/${blog.slug}`}
                                    className="blog-card"
                                >
                                    <div className="blog-media relative overflow-hidden">
                                        {blog.cover ? (
                                            <Image
                                                src={blog.cover}
                                                alt={blog.title}
                                                fill
                                                sizes="(max-width: 720px) 100vw, (max-width: 900px) 50vw, 33vw"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    background:
                                                        'linear-gradient(135deg, #00A5C8, #5FDDEA)',
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div className="blog-body">
                                        <div className="cat">{blog.cat}</div>
                                        <h4>{blog.title}</h4>
                                        <p>{blog.desc}</p>
                                        <div className="blog-meta-row">
                                            <span>{blog.date}</span>
                                            <span>{blog.readTime}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}