import { Reveal } from '@/components/Reveal';

export function TermsContent({ body }) {
  if (!body) return null;

  return (
    <section className="section-shell">
      <div className="container-x">
        <Reveal>
          <div
            className="content-block prose-terms"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          
            
          
        </Reveal>
      </div>
    </section>
  );
}