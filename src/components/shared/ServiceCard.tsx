import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  compact?: boolean;
}

const categoryColors: Record<string, string> = {
  'event-management': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  'printing': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'advertising': 'text-green-400 bg-green-400/10 border-green-400/20',
};

const categoryLabels: Record<string, string> = {
  'event-management': 'Event Management',
  'printing': 'Printing',
  'advertising': 'Advertising',
};

export default function ServiceCard({ service, compact = false }: ServiceCardProps) {
  return (
    <div className="gold-card rounded-xl p-6 h-full flex flex-col group">
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{service.icon}</div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[service.category]}`}>
          {categoryLabels[service.category]}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C9A84C] transition-colors">
        {service.title}
      </h3>
      <p className="text-[#999999] text-sm leading-relaxed mb-4 flex-1">
        {service.description}
      </p>

      {!compact && (
        <ul className="space-y-1.5 mb-5">
          {service.features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-[#CCCCCC]">
              <Check size={14} className="text-[#C9A84C] flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      )}

      <Link
        href={`/services#${service.id}`}
        className="inline-flex items-center gap-2 text-[#C9A84C] text-sm font-semibold hover:gap-3 transition-all group/link mt-auto"
      >
        Learn more
        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}