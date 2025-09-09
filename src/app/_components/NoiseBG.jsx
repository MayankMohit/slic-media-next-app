const NoiseBG = () => {
  return (
    <div className="absolute inset-0 bg-black opacity-50 -z-10">
      <svg className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence type="turbulence" baseFrequency="0.5" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.5" />
            <feFuncG type="linear" slope="0.5" />
            <feFuncB type="linear" slope="0.5" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};

export default NoiseBG;
