"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Building2, GraduationCap, Heart, Home, MessageCircleMore, Shield, Sparkles, Users, X } from "lucide-react";
import {
  AnimatedSection,
  InViewBlock,
  ScrollReveal,
} from "@/components/recruit/animated-section";
import { LineCtaButton } from "@/components/recruit/line-cta-button";
import { SectionHeading } from "@/components/recruit/section-heading";
import {
  fadeInUp,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/animations";
import { recruitSite } from "@/lib/recruit-data";

type Requirement = (typeof recruitSite.requirements)[number];
type Comment = (typeof recruitSite.comments)[number];

function RequirementBlock({
  title,
  children,
  showDivider = true,
}: {
  title: string;
  children: React.ReactNode;
  showDivider?: boolean;
}) {
  return (
    <section className={showDivider ? "border-b border-gray-100 pb-8 last:border-b-0 last:pb-0" : ""}>
      <h4 className="text-sm font-bold text-gray-900">{title}</h4>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function SectionGlow() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-red-100/80 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-red-50 blur-3xl"
      />
    </>
  );
}

function RequirementDetails({ job }: { job: Requirement }) {
  const blocks: { title: string; content: React.ReactNode }[] = [
    ...job.baseInfo.map(([label, value]) => ({
      title: label,
      content: <p>{value}</p>,
    })),
    { title: "仕事内容", content: <p>{job.jobDescription}</p> },
    { title: "給与", content: <p>{job.salary}</p> },
    { title: "勤務時間", content: <p>{job.hours}</p> },
    {
      title: "給与詳細",
      content: (
        <ul className="space-y-1">
          {job.salaryDetails.map((item) => (
            <li key={item}>・{item}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "月収例",
      content: (
        <ul className="space-y-1">
          {job.exampleIncome.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "休日・休暇",
      content: (
        <ul className="space-y-1">
          {job.holidays.map((item) => (
            <li key={item}>・{item}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "応募資格",
      content: (
        <ul className="space-y-1">
          {job.qualifications.map((item) => (
            <li key={item}>・{item}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "福利厚生",
      content: (
        <ul className="grid gap-2 md:grid-cols-2">
          {job.benefits.map((item) => (
            <li key={item}>・{item}</li>
          ))}
        </ul>
      ),
    },
  ];

  if ("companyInfo" in job && job.companyInfo) {
    blocks.push(
      ...job.companyInfo.map(([label, value]) => ({
        title: label,
        content: <p>{value}</p>,
      })),
    );
  }

  return (
    <div className="space-y-8 text-sm leading-7 text-gray-600">
      {blocks.map((block, index) => (
        <RequirementBlock
          key={block.title}
          title={block.title}
          showDivider={index < blocks.length - 1}
        >
          {block.content}
        </RequirementBlock>
      ))}
    </div>
  );
}

function CommentModal({
  comment,
  onClose,
}: {
  comment: Comment;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/55 p-4 backdrop-blur-sm md:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="comment-modal-title"
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-gray-200 bg-white p-6 shadow-2xl md:p-8"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-2xl border border-gray-200">
              <Image
                src={comment.image}
                alt={`${comment.position} ${comment.name}`}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs tracking-[0.24em] text-red-600 uppercase">
                Staff Voice
              </p>
              <p className="mt-1 text-sm text-gray-500">{comment.position}</p>
              <h3 id="comment-modal-title" className="text-xl font-bold text-gray-900">
                {comment.name}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
            aria-label="閉じる"
          >
            <X className="size-5" />
          </button>
        </div>
        <p className="mt-6 text-xl font-bold text-gray-900">{comment.title}</p>
        <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600 md:text-base md:leading-8">
          {comment.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CtaBannerSection() {
  return (
    <AnimatedSection className="relative overflow-hidden bg-gray-50 px-4 py-8 md:px-8 md:py-10">
      <InViewBlock variants={fadeInUp}>
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-[2rem] border border-red-200 bg-gradient-to-r from-red-700 via-red-600 to-red-800 p-6 shadow-[0_24px_80px_rgba(127,29,29,0.18)] md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-sm font-semibold tracking-[0.35em] text-red-100 uppercase">
              Line Entry
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
              LINEから、まずは気軽に応募。
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
              私たちと一緒に働きませんか？公式LINEから、ご応募をお待ちしております。
            </p>
          </div>
          <LineCtaButton
            label="LINEで無料相談する"
            sublabel="無料でご相談いただけます"
            location="cta-banner"
          />
        </div>
      </InViewBlock>
    </AnimatedSection>
  );
}

export function FoundersSection() {
  return (
    <AnimatedSection
      id="founders"
      className="relative overflow-hidden px-4 py-20 md:px-8 md:py-32"
    >
      <SectionGlow />
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-red-100 bg-gradient-to-br from-red-50 via-white to-white p-6 shadow-sm md:p-10">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <InViewBlock variants={fadeInUp}>
            <motion.div
              className="relative overflow-hidden rounded-[1.75rem] border border-red-100 shadow-md"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={recruitSite.founders.image}
                alt="けーさんとたろー"
                width={854}
                height={855}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </InViewBlock>
          <InViewBlock variants={fadeInUp} delay={0.15}>
            <div className="flex flex-col justify-center">
              <SectionHeading
                label={recruitSite.founders.label}
                title={recruitSite.founders.title}
              />
              <p className="mt-3 text-base font-bold text-gray-900 md:text-lg">
                {recruitSite.founders.role}
              </p>
              <div className="mt-12 space-y-4 text-sm leading-7 text-gray-600 md:text-base md:leading-8">
                {recruitSite.founders.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <a
                href={recruitSite.founders.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-900 transition hover:border-red-200 hover:bg-red-50"
              >
                <Image
                  src="/images/youtube.png"
                  alt="YouTube"
                  width={40}
                  height={28}
                  className="h-7 w-auto"
                />
                YouTube
              </a>
            </div>
          </InViewBlock>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function AboutSection() {
  const pointIcons = [Building2, Shield, GraduationCap] as const;
  const pointColors = [
    "from-red-500 to-red-600",
    "from-rose-500 to-red-500",
    "from-orange-500 to-red-500",
  ] as const;

  return (
    <AnimatedSection id="about" className="relative overflow-hidden px-4 py-20 md:px-8 md:py-32">
      <SectionGlow />
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-red-100 bg-gradient-to-br from-red-50 via-white to-white p-6 shadow-sm md:p-10">
        <InViewBlock variants={fadeInUp}>
          <SectionHeading
            label="About Us"
            title={recruitSite.about.heading}
          />
          <div className="mt-5 max-w-3xl text-sm leading-7 text-gray-600 md:text-base md:leading-8">
            <p>{recruitSite.about.description[0]}</p>
            <p className="mt-4">{recruitSite.about.description[1]}</p>
          </div>
        </InViewBlock>
        <div className="mt-10 space-y-4">
          {recruitSite.about.points.map((point, index) => {
            const Icon = pointIcons[index] ?? Building2;
            const color = pointColors[index] ?? pointColors[0];

            return (
              <ScrollReveal key={point.title} variants={slideInLeft}>
                <div className="relative overflow-hidden rounded-3xl border border-white bg-white/90 p-5 shadow-[0_16px_40px_rgba(217,43,52,0.08)] md:p-6">
                  <div className="relative z-10 flex gap-4">
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-md`}
                    >
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-[0.3em] text-red-600 uppercase">
                        Point {index + 1}
                      </p>
                      <h3 className="mt-2 text-lg font-bold text-gray-900">{point.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-gray-600 md:text-base">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function JobsRequirementsSection() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash.startsWith("requirement-")) {
        setExpandedSlug(hash.replace("requirement-", ""));
      } else if (hash === "requirements") {
        setExpandedSlug(null);
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const scrollToJobCard = (slug: string) => {
    window.setTimeout(() => {
      document.getElementById(`job-card-${slug}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 480);
  };

  const openJob = (slug: string) => {
    setExpandedSlug(slug);
    window.history.replaceState(null, "", `#requirement-${slug}`);
  };

  const closeJob = (slug: string) => {
    setExpandedSlug(null);
    window.history.replaceState(null, "", "#requirements");
    scrollToJobCard(slug);
  };

  const toggleJob = (slug: string) => {
    if (expandedSlug === slug) {
      closeJob(slug);
      return;
    }
    openJob(slug);
  };

  return (
    <AnimatedSection
      id="requirements"
      className="scroll-mt-28 bg-gray-50 px-4 py-20 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <InViewBlock variants={fadeInUp}>
          <SectionHeading
            label="Our Jobs"
            title="募集要項"
            description={recruitSite.requirementsIntro}
          />
        </InViewBlock>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {recruitSite.jobs.map((job) => {
            const requirement = recruitSite.requirements.find(
              (item) => item.id === job.slug,
            );
            const isExpanded = expandedSlug === job.slug;

            if (!requirement) return null;

            return (
              <div
                key={job.slug}
                id={`job-card-${job.slug}`}
                className={`scroll-mt-28 ${isExpanded ? "md:col-span-3" : ""}`}
              >
                <motion.article
                  className={`overflow-hidden rounded-[1.75rem] border bg-white shadow-sm transition-colors ${
                    isExpanded
                      ? "border-red-300 shadow-md"
                      : "border-gray-200 hover:border-red-200 hover:shadow-md"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleJob(job.slug)}
                    className="w-full p-6 text-left"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-xs font-semibold tracking-[0.28em] text-red-600 uppercase">
                          {job.accent}
                        </p>
                        <h3 className="mt-4 text-2xl font-bold text-gray-900">
                          {job.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-gray-600">
                          {job.description}
                        </p>
                        <div className="mt-6 space-y-4 text-sm leading-7 text-gray-600">
                          <div>
                            <p className="font-bold text-gray-900">勤務地</p>
                            <p className="mt-1">{job.location}</p>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">雇用形態</p>
                            <p className="mt-1">{job.employment}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-center gap-2 pt-1">
                        <span
                          className={`rounded-full border p-2 transition ${
                            isExpanded
                              ? "border-red-200 bg-red-50 text-red-600"
                              : "border-gray-200 text-gray-400"
                          }`}
                        >
                          {isExpanded ? (
                            <ChevronDown className="size-5" />
                          ) : (
                            <ChevronRight className="size-5" />
                          )}
                        </span>
                        <span className="text-xs font-semibold text-red-600">
                          {isExpanded ? "閉じる" : "詳細"}
                        </span>
                      </div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded ? (
                      <motion.div
                        key="details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gray-100 px-6 pb-8">
                          <div className="pt-6">
                            <RequirementDetails job={requirement} />
                          </div>
                          <div className="mt-8 flex justify-center">
                            <LineCtaButton
                              label="この職種でLINE相談する"
                              location={`job-${job.slug}`}
                              className="px-5 py-3 text-sm"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              closeJob(job.slug);
                            }}
                            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-900 transition hover:border-red-200 hover:bg-red-50"
                          >
                            <ChevronDown className="size-4 text-red-600" />
                            閉じる
                          </button>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function AppealSection() {
  const appealIcons = [Building2, Users, Heart] as const;
  const appealColors = [
    "from-red-500 to-red-600",
    "from-rose-500 to-red-500",
    "from-orange-500 to-red-500",
  ] as const;

  return (
    <AnimatedSection className="relative overflow-hidden px-4 py-20 md:px-8 md:py-32">
      <div className="absolute inset-0">
        <Image
          src={recruitSite.appeal.backgroundImage}
          alt="LINEで働く人々"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/88" />
      </div>
      <SectionGlow />
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-red-100 bg-gradient-to-br from-red-50/80 via-white/90 to-white/90 p-6 shadow-sm backdrop-blur-sm md:p-10">
        <InViewBlock variants={fadeInUp}>
          <SectionHeading
            label="Why Join"
            title="この仕事の魅力"
            description={recruitSite.appeal.description}
          />
        </InViewBlock>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {recruitSite.appeal.items.map((item, index) => {
            const Icon = appealIcons[index] ?? Heart;
            const color = appealColors[index] ?? appealColors[0];

            return (
              <ScrollReveal key={item.title} variants={slideInRight}>
                <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-white bg-white/90 p-6 shadow-[0_16px_40px_rgba(217,43,52,0.08)]">
                  <div
                    className={`inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-md`}
                  >
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-gray-600">{item.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function BeginnerSection() {
  const reasonIcons = [Sparkles, Home, MessageCircleMore] as const;
  const reasonColors = [
    "from-red-500 to-red-600",
    "from-rose-500 to-red-500",
    "from-orange-500 to-red-500",
  ] as const;

  return (
    <AnimatedSection className="relative overflow-hidden px-4 py-20 md:px-8 md:py-32">
      <SectionGlow />
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-red-100 bg-gradient-to-br from-red-50 via-white to-white p-6 shadow-sm md:p-10">
        <InViewBlock variants={fadeInUp}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              label="For Beginner"
              title="未経験でも安心な理由"
              description={recruitSite.beginner.description}
            />
            <div className="flex shrink-0 gap-3">
              {reasonIcons.map((Icon, index) => (
                <div
                  key={index}
                  className={`flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${reasonColors[index]} text-white shadow-lg`}
                >
                  <Icon className="size-7" />
                </div>
              ))}
            </div>
          </div>
        </InViewBlock>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {recruitSite.beginner.reasons.map((reason, index) => {
            const Icon = reasonIcons[index] ?? Sparkles;
            const color = reasonColors[index] ?? reasonColors[0];

            return (
              <ScrollReveal key={reason.title} variants={fadeInUp}>
                <div className="group relative h-full overflow-hidden rounded-[1.5rem] border border-white bg-white/90 p-6 shadow-[0_16px_40px_rgba(217,43,52,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(217,43,52,0.12)]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-24 rounded-full bg-red-50 transition group-hover:bg-red-100"
                  />
                  <div className="relative z-10">
                    <div
                      className={`inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-md`}
                    >
                      <Icon className="size-7" />
                    </div>
                    <p className="mt-5 text-xs font-semibold tracking-[0.28em] text-red-500 uppercase">
                      Point {index + 1}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-gray-900">{reason.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-gray-600">{reason.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function CommentsSection() {
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const uniqueComments = recruitSite.comments;

  return (
    <AnimatedSection className="overflow-hidden bg-gray-50 px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <InViewBlock variants={fadeInUp}>
          <SectionHeading
            label="Voices"
            title="社員コメント"
            description={recruitSite.voices.description}
          />
        </InViewBlock>
        <div className="mt-10 overflow-hidden">
          <motion.div
            className="flex w-max gap-5"
            animate={
              selectedComment ? undefined : { x: ["0%", "-50%"] }
            }
            transition={
              selectedComment
                ? { duration: 0 }
                : { duration: 40, repeat: Infinity, ease: "linear" }
            }
          >
            {[...uniqueComments, ...uniqueComments].map((comment, index) => (
              <button
                key={`${comment.name}-${index}`}
                type="button"
                onClick={() => setSelectedComment(comment)}
                className="w-[85vw] max-w-[32rem] shrink-0 cursor-pointer rounded-[2rem] border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-md md:p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-[72px] w-[72px] overflow-hidden rounded-2xl border border-gray-200">
                    <Image
                      src={comment.image}
                      alt={`${comment.position} ${comment.name}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.24em] text-red-600 uppercase">
                      Staff Voice
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{comment.position}</p>
                    <h3 className="text-xl font-bold text-gray-900">{comment.name}</h3>
                  </div>
                </div>
                <p className="mt-5 text-xl font-bold text-gray-900">{comment.title}</p>
                <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-600">
                  {comment.body[0]}
                </p>
                <p className="mt-4 text-sm font-semibold text-red-600">続きを読む</p>
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedComment ? (
          <CommentModal
            comment={selectedComment}
            onClose={() => setSelectedComment(null)}
          />
        ) : null}
      </AnimatePresence>
    </AnimatedSection>
  );
}

export function FlowSection() {
  return (
    <AnimatedSection className="bg-gray-50 px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <InViewBlock variants={fadeInUp}>
          <SectionHeading
            label="Entry Flow"
            title="応募の流れ"
            description={recruitSite.flowIntro}
          />
        </InViewBlock>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {recruitSite.flow.map((step) => (
            <ScrollReveal key={step.step} variants={fadeInUp}>
              <div className="h-full rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-4xl font-black text-red-200">{step.step}</p>
                <h3 className="mt-4 text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-gray-600">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function FaqSection() {
  return (
    <AnimatedSection id="faq" className="px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-4xl">
        <InViewBlock variants={fadeInUp}>
          <SectionHeading
            label="FAQ"
            title="よくある質問"
            description="応募前に気になることを先回りして解消できるよう、よくある疑問をまとめています。"
            align="center"
          />
        </InViewBlock>
        <div className="mt-10 space-y-4">
          {recruitSite.faq.map((item) => (
            <ScrollReveal key={item.question} variants={scaleIn}>
              <div className="rounded-[1.5rem] border border-gray-200 bg-white p-5 shadow-sm md:p-6">
                <div className="flex items-start gap-3">
                  <MessageCircleMore className="mt-1 size-5 shrink-0 text-red-600" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.question}</h3>
                    <p className="mt-3 text-sm leading-7 text-gray-600">{item.answer}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function FinalCtaSection() {
  return (
    <AnimatedSection className="px-4 pt-20 pb-28 md:px-8 md:pt-32 md:pb-36">
      <ScrollReveal variants={slideInRight}>
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-red-200 bg-gradient-to-br from-red-700 via-red-600 to-red-800 p-6 text-center shadow-[0_24px_80px_rgba(127,29,29,0.2)] md:p-12">
          <SectionHeading
            title={recruitSite.finalCta.title}
            description={recruitSite.finalCta.description}
            align="center"
            light
          />
          <div className="mt-10 flex flex-col items-center gap-6">
            <LineCtaButton
              label="LINEで無料相談する"
              sublabel="まずは気軽にお問い合わせください"
              location="final-cta"
            />
            <div className="flex flex-col items-center rounded-[1.75rem] border border-white/20 bg-black/10 p-6">
              <Image
                src="/images/line-qr.png"
                alt="公式LINE QRコード"
                width={160}
                height={160}
                className="rounded-2xl bg-white p-2"
              />
              <p className="mt-4 text-sm leading-7 text-white/80">
                PCからでもスマホからでも、LINEで気軽に応募・問い合わせできます。
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </AnimatedSection>
  );
}
