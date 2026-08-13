'use client';

import { useState } from 'react';
import { Reveal } from './Reveal';

export function AboutContent({ faqData, aboutFaqs }) {
    const [openFaq, setOpenFaq] = useState(-1);
    const faqs = faqData?.faqs || aboutFaqs;
    const eyebrow = faqData?.eyebrow || "Common questions";
    const heading = faqData?.heading || "Frequently asked.";

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
                    {faqs.map((faq, i) => (
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
                </Reveal>
            </div>
        </section>
    );
}