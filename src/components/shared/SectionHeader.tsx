interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ badge, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      {badge && (
        <span className="inline-block text-[#C9A84C] text-sm font-semibold uppercase tracking-wider mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#999999] text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}





// interface SectionHeaderProps {
//   eyebrow?: string;
//   title: string;
//   highlight?: string;
//   description?: string;
//   align?: 'left' | 'center';
// }

// export default function SectionHeader({
//   eyebrow,
//   title,
//   highlight,
//   description,
//   align = 'center',
// }: SectionHeaderProps) {
//   const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

//   return (
//     <div className={`flex flex-col ${alignClass} mb-12`}>
//       {eyebrow && (
//         <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A84C] mb-3">
//           {eyebrow}
//         </span>
//       )}
//       <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
//         {title}{' '}
//         {highlight && <span className="gold-text">{highlight}</span>}
//       </h2>
//       <div className={`gold-divider mt-4 ${align === 'left' ? 'ml-0' : ''}`} />
//       {description && (
//         <p className={`mt-4 text-[#999999] text-base md:text-lg leading-relaxed max-w-2xl ${align === 'center' ? 'text-center' : ''}`}>
//           {description}
//         </p>
//       )}
//     </div>
//   );
// }