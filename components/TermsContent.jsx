import { Reveal } from '@/components/Reveal';
import { marked } from 'marked';

export function TermsContent({ body }) {
  if (!body) return null;

  const html = marked.parse(body);

  return (
    <section className="section-shell">
      <div className="container-x">
        <Reveal>
          <div
            className="content-block prose-terms"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Reveal>
      </div>
    </section>
  );
}