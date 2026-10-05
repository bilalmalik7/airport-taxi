import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import { JsonLd } from "@/components/Chrome";
import { FadeUp, Reveal } from "@/components/Motion";
import { CtaBand, GuideCards } from "@/components/Sections";
import { guides } from "@/lib/content";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => guides.map((g) => ({ slug: g.slug }));

const find = (slug: string) => guides.find((g) => g.slug === slug);
const anchor = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = find((await params).slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { type: "article", title: g.title, description: g.description },
  };
}

export default async function GuidePage({ params }: Props) {
  const g = find((await params).slug);
  if (!g) notFound();

  return (
    <>
      <JsonLd data={articleSchema({ title: g.title, description: g.description, path: `/guides/${g.slug}` })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: g.title, path: `/guides/${g.slug}` },
        ])}
      />
      <section className="page-hero">
        <div className="wrap narrow">
          <FadeUp>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link> › <Link href="/guides">Guides</Link>
            </nav>
            <h1>{g.title}</h1>
            <p className="lead">{g.description}</p>
            <p className="muted">📖 {g.readMins} min read</p>
          </FadeUp>
        </div>
      </section>
      <div className="wrap article-grid">
        <article className="prose article">
          <nav className="toc" aria-label="Contents">
            <b>In this guide</b>
            <ol>
              {g.sections.map((s) => (
                <li key={s.h}>
                  <a href={`#${anchor(s.h)}`}>{s.h}</a>
                </li>
              ))}
            </ol>
          </nav>
          {g.sections.map((s) => (
            <Reveal key={s.h}>
              <h2 id={anchor(s.h)}>{s.h}</h2>
              {s.p.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.list && (
                <ul className="ticks">
                  {s.list.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </article>
        <aside className="article-aside">
          <div className="hero-form sticky">
            <h2 className="form-title">Get your fixed price</h2>
            <BookingForm />
          </div>
        </aside>
      </div>
      <section className="section alt">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>More guides</h2>
          </Reveal>
          <GuideCards limit={3} exclude={g.slug} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
