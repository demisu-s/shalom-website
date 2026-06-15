import { stats } from '@/data/stats';

export default function StatsSection() {
  return (
    <section className="py-16 bg-[#111111] border-y border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-4xl md:text-5xl font-black gold-text mb-2">
                {stat.value}{stat.suffix}
              </div>
              <p className="text-[#999999] text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              <div className="gold-divider mx-auto mt-3 w-8" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}