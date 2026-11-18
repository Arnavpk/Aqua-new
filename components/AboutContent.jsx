'use client';

import { useState } from 'react';
import { Reveal } from './Reveal';

// visibleCount (optional): show only this many FAQs, with "Read more" for the rest.
// Leave it out to show every FAQ, as before.
export function AboutContent({ faqData, aboutFaqs, visibleCount = null }) {
    const [openFaq, setOpenFaq] = useState(-1);
    const [expanded, setExpanded] = useState(false);
    const faqs = faqData?.faqs || aboutFaqs || [];
    const eyebrow = faqData?.eyebrow || "Common questions";
    const heading = faqData?.heading || "Frequently asked.";

    const limited = Boolean(visibleCount) && faqs.length > visibleCount;
    const shown = limited && !expanded ? faqs.slice(0, visibleCount) : faqs;

    const toggleMore = () => {
        // Close an open answer that is about to be hidden.
        if (expanded && openFaq >= visibleCount) setOpenFaq(-1);
        setExpanded(!expanded);
    };

    return (
        <section className="section-shell" style={{ background: 'white', padding: '44px 0' }}>
            <div className="container-x">
                <Reveal className="section-head">
                    <div>
                        <span className="eyebrow mb-2 block">{eyebrow}</span>
                        <h2 className="h2">{heading}</h2>
                    </div>
                </Reveal>
                <Reveal>
                    {shown.map((faq, i) => (
                        <div key={i} className="about-faq-item">
                            <button
                                type="button"
                                className={`about-faq-q ${openFaq === i ? 'is-open' : ''}`}
                                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                aria-expanded={openFaq === i}
                            >
                                {faq.q}<span className="arrow">⌄</span>
                            </button>
                            <div className="about-faq-a" style={{ maxHeight: openFaq === i ? '200px' : '0' }}>
                                <div className="about-faq-a-inner">{faq.a}</div>
                            </div>
                        </div>
                    ))}
                    {limited && (
                        <button
                            type="button"
                            onClick={toggleMore}
                            aria-expanded={expanded}
                            className="mt-5 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
                        >
                            {expanded ? 'Show less' : `Read more (${faqs.length - visibleCount})`}
                        </button>
                    )}
                </Reveal>
            </div>
        </section>
    );
}