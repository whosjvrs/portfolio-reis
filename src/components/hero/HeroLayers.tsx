function HeroLayers() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative isolate aspect-[6/5] w-full max-w-[360px] justify-self-center overflow-visible lg:max-w-[480px] lg:justify-self-end"
    >
      <div className="absolute top-[4%] left-[2%] z-10 aspect-[4/3] w-[72%] rounded-[6px] border border-cream/[0.18] bg-gradient-to-br from-[#263756] to-[#1A2742] shadow-[0_10px_24px_rgba(9,18,38,0.14)]" />
      <div className="absolute top-[20%] right-[2%] z-20 aspect-[4/3] w-[72%] rounded-[6px] border border-cream/[0.18] bg-gradient-to-br from-[#2B3D5E] to-[#20304F] shadow-[0_12px_26px_rgba(9,18,38,0.16)]" />
      <div className="absolute top-[32%] left-[14%] z-30 aspect-[4/3] w-[72%] rounded-[6px] border border-cream/[0.18] bg-gradient-to-br from-[#314666] to-[#243756] shadow-[0_14px_30px_rgba(9,18,38,0.2)]" />
    </div>
  )
}

export default HeroLayers
