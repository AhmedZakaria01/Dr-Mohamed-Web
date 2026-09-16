import { AnimatedStat } from "@/components/base/AnimatedStat";
import { Reveal } from "@/components/base/Reveal";

/**
 * The 3 real stats (patients / years of experience / satisfaction) — count
 * up into view.
 * @param {{ stats: Array<{ value: string, label: string }> }} props
 */
export function StatsRow({ stats }) {
  return (
    <dl className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
      {stats.map((stat, index) => (
        <Reveal key={stat.label} delay={index * 120}>
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-white px-6 py-10 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute inset-x-8 -top-10 h-20 rounded-full bg-brand-500/10 blur-2xl transition-colors group-hover:bg-brand-500/20" />
            <dt className="sr-only">{stat.label}</dt>
            <dd className="relative text-5xl font-bold tracking-tight text-brand-600">
              <AnimatedStat value={stat.value} />
            </dd>
            <p className="relative mt-3 text-sm font-medium text-muted-foreground">{stat.label}</p>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}
