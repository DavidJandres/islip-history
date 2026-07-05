import Image from "next/image";
import { localizedPath } from "@/i18n/config";
import { loadLocale, type LocaleParams } from "@/i18n/page";
import { buildMetadata } from "@/lib/metadata";
import { teamPhotos } from "@/lib/team";
import { cn, initials } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rule } from "@/components/ui/rule";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  return buildMetadata({
    locale,
    title: dict.aboutFellowship.title,
    description: dict.aboutFellowship.lede,
    siteName: dict.common.siteName,
    path: "/about/fellowship",
  });
}

interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
}

// A team member or contributor card. Renders the person's photo when one
// exists in teamPhotos, otherwise an honest monogram plate (same treatment as
// the People roster) — kept aria-hidden since the name is the adjacent heading.
function MemberCard({ member, anchor }: { member: Member; anchor: string }) {
  const photo: string | undefined = teamPhotos[member.id];
  const box = "w-32 shrink-0 self-start rounded-sm border border-line sm:w-44";
  return (
    <article
      id={anchor}
      className="flex scroll-mt-24 flex-col gap-5 py-8 first:pt-2 sm:flex-row sm:gap-7"
    >
      {photo ? (
        <Image
          src={photo}
          alt=""
          width={480}
          height={600}
          sizes="(min-width: 640px) 176px, 128px"
          className={cn(box, "h-auto")}
        />
      ) : (
        <div
          aria-hidden
          className={cn(box, "flex aspect-[4/5] items-center justify-center bg-gray")}
        >
          <span className="font-heading text-3xl font-bold text-blue/70 sm:text-4xl">
            {initials(member.name)}
          </span>
        </div>
      )}
      <div>
        <h3 className="text-xl sm:text-2xl">{member.name}</h3>
        <p className="mt-1 text-sm font-semibold text-gold-dark">{member.role}</p>
        <p className="mt-3 leading-relaxed text-ink/90">{member.bio}</p>
      </div>
    </article>
  );
}

export default async function AboutFellowshipPage({ params }: LocaleParams) {
  const { locale, dict } = await loadLocale(params);
  const fellowship = dict.aboutFellowship;

  return (
    <Section size="narrow">
      <Breadcrumb
        homeLabel={dict.common.home}
        label={dict.common.breadcrumbLabel}
        homeHref={localizedPath(locale, "/")}
        trail={[
          { label: dict.aboutProject.breadcrumb, href: localizedPath(locale, "/about") },
          { label: fellowship.breadcrumb },
        ]}
      />

      <div className="mt-6 measure">
        <Eyebrow>{fellowship.eyebrow}</Eyebrow>
        <h1 className="text-3xl sm:text-4xl">{fellowship.title}</h1>
        <p className="mt-5 text-lg font-semibold text-ink">{fellowship.lede}</p>
        {fellowship.intro.map((para) => (
          <p key={para} className="mt-4 leading-relaxed text-ink/90">
            {para}
          </p>
        ))}

        <h2 className="mt-10 text-xl sm:text-2xl">{fellowship.foundationTitle}</h2>
        <p className="mt-3 leading-relaxed text-ink/90">{fellowship.foundationBody}</p>

        <h2 className="mt-10 text-xl sm:text-2xl">{fellowship.teamTitle}</h2>
        <div className="mt-6 divide-y divide-line">
          {fellowship.team.map((member) => (
            <MemberCard key={member.id} member={member} anchor={`team-${member.id}`} />
          ))}
        </div>

        <h2 className="mt-12 text-xl sm:text-2xl">{fellowship.contributorsTitle}</h2>
        <p className="mt-3 leading-relaxed text-ink/90">{fellowship.contributorsIntro}</p>
        <div className="mt-6 divide-y divide-line">
          {fellowship.contributors.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              anchor={`contributor-${member.id}`}
            />
          ))}
        </div>

        <Rule className="mt-10" />
        <h2 className="mt-8 font-heading text-sm font-bold uppercase tracking-wide text-gold-dark">
          {fellowship.ackTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{fellowship.ackBody}</p>
      </div>
    </Section>
  );
}
