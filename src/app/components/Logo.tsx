interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-8" }: LogoProps) {
  return (
    <img 
      src="https://bion-dev.zlabs.my.id/images/kelar.png"
      alt="Kelar.co.id"
      className={className}
    />
  );
}