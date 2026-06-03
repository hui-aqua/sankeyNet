// src/components/sankeyData.ts

export interface NodeContent {
  title: string;
  description: string;
  imageUrl?: string;
}

export const NODE_DETAILS: Record<string, NodeContent> = {
  // Material Type Level
  "Synthetic material": {
    title: "Synthetic Material",
    description: "Man-made polymers derived from petrochemicals. They form the vast majority of modern aquaculture netting due to their flexibility, high tensile strength, and cost-effectiveness.",
    imageUrl: "https://placehold.co/600x400/0ea5a4/ffffff?text=Synthetic+Materials"
  },
  "Metal material": {
    title: "Metal Material",
    description: "Rigid or semi-rigid metallic wire meshes used primarily for predator exclusion and maintaining pen shape in high-energy oceanic environments.",
    imageUrl: "https://placehold.co/600x400/ffd43b/333333?text=Metal+Materials"
  },

  // Material Family Level
  "Polyamide family": {
    title: "Polyamide (Nylon) Family",
    description: "Commonly known as Nylon, this family is characterized by high strength, excellent stretchability (elasticity), and good abrasion resistance. It is heavier than water and sinks easily.",
    imageUrl: "https://placehold.co/600x400/475569/ffffff?text=Polyamide+Family"
  },
  "Polyester family": {
    title: "Polyester Family",
    description: "Polyesters (like PET) are denser than water (ensuring they sink), offer high UV resistance, and have very low creep (stretching over time), making them excellent for maintaining cage volume.",
    imageUrl: "https://placehold.co/600x400/61e786/333333?text=Polyester+Family"
  },
  "Polyethylene family": {
    title: "Polyethylene Family",
    description: "Includes various PE materials (like HDPE and UHMWPE). They do not absorb water, retain 100% of their strength when wet, naturally float, and offer superb chemical resistance.",
    imageUrl: "https://placehold.co/600x400/4dabf7/ffffff?text=Polyethylene+Family"
  },
  "Steel family": {
    title: "Steel Family",
    description: "Iron-based alloys (Stainless, Galvanized) providing extreme structural rigidity and tensile strength, primarily used for predator-proof rigid cage designs.",
    imageUrl: "https://placehold.co/600x400/ffd43b/333333?text=Steel+Family"
  },
  "Copper Alloy family": {
    title: "Copper Alloy Family",
    description: "Metals containing copper which inherently repel marine biofouling. This drastically reduces the need for net cleaning and improves water flow and oxygenation for the fish.",
    imageUrl: "https://placehold.co/600x400/f79316/ffffff?text=Copper+Alloy+Family"
  },

  // Raw Material Level
  PA6: {
    title: "Polyamide 6 (Nylon 6)",
    description: "PA6 is widely used in aquaculture netting due to its high tensile strength, excellent elasticity, and abrasion resistance. However, it absorbs water, which can slightly reduce its breaking strength over prolonged submersed periods.",
    imageUrl: "https://placehold.co/600x400/475569/ffffff?text=PA6+(Nylon+6)"
  },
  PA66: {
    title: "Polyamide 66 (Nylon 66)",
    description: "PA66 offers higher mechanical strength, rigidity, and better heat resistance compared to PA6, though it is generally more expensive and slightly harder to process into fine netting.",
    imageUrl: "https://placehold.co/600x400/475569/ffffff?text=PA66+(Nylon+66)"
  },
  "PA610, PA612, etc.": {
    title: "Specialty Polyamides (PA610, PA612)",
    description: "Specialty nylon variants engineered to have lower water absorption and better dimensional stability in marine environments compared to standard PA6.",
    imageUrl: "https://placehold.co/600x400/475569/ffffff?text=Specialty+Polyamides"
  },
  HDPE: {
    title: "High-Density Polyethylene",
    description: "HDPE is highly valued in fish farming cages because it does not absorb water, retains 100% of its strength when wet, and naturally floats. It offers superb chemical resistance and UV stability.",
    imageUrl: "https://placehold.co/600x400/4dabf7/ffffff?text=HDPE+Netting"
  },
  UHMWPE: {
    title: "Ultra-High-Molecular-Weight Polyethylene",
    description: "UHMWPE (often known by brands like Dyneema or Spectra) is incredibly strong—often stronger than steel by weight—and highly resistant to abrasion. Used extensively in premium predator-resistant nets.",
    imageUrl: "https://placehold.co/600x400/4dabf7/ffffff?text=UHMWPE+Fibers"
  },
  PET: {
    title: "Polyethylene Terephthalate (PET)",
    description: "A common polyester that is naturally heavy (sinking) and highly resistant to stretching. Often extruded as monofilament wire for rigid, predator-resistant semi-flexible cages.",
    imageUrl: "https://placehold.co/600x400/61e786/333333?text=PET+Netting"
  },
  "PEN, PBT, PTT, etc.": {
    title: "Advanced Polyesters",
    description: "Advanced polyester variants like PEN or PBT that offer specialized properties, such as enhanced dynamic elasticity or superior chemical resistance for niche netting applications.",
    imageUrl: "https://placehold.co/600x400/61e786/333333?text=Advanced+Polyesters"
  },
  "Stainless Steel": {
    title: "Stainless Steel",
    description: "Highly resistant to corrosion and biofouling. Forms rigid meshes that keep large marine predators out and maintain strict cage volume in very strong oceanic currents.",
    imageUrl: "https://placehold.co/600x400/ffd43b/333333?text=Stainless+Steel+Mesh"
  },
  "Galvanized Steel": {
    title: "Galvanized Steel",
    description: "Steel wire coated with a protective zinc layer. More affordable than stainless steel but requires careful monitoring and maintenance to prevent rust in harsh marine environments.",
    imageUrl: "https://placehold.co/600x400/ffd43b/333333?text=Galvanized+Steel"
  },
  Brass: {
    title: "Brass",
    description: "A copper-zinc alloy. Copper-based alloys naturally resist biofouling, significantly reducing the need for chemical treatments or manual cleaning of the pens.",
    imageUrl: "https://placehold.co/600x400/f79316/ffffff?text=Brass+Mesh"
  },
  "Silicon Bronze": {
    title: "Silicon Bronze",
    description: "A copper alloy mixed with silicon, offering superior structural strength and corrosion resistance, making it ideal for long-term marine submersion.",
    imageUrl: "https://placehold.co/600x400/f79316/ffffff?text=Silicon+Bronze"
  },
  "Copper Nickel": {
    title: "Copper Nickel (Cu-Ni)",
    description: "Cu-Ni alloys possess extraordinary natural resistance to biofouling and seawater corrosion. Often used in high-end, rigid aquaculture pens that require minimal maintenance.",
    imageUrl: "https://placehold.co/600x400/f79316/ffffff?text=Copper+Nickel+Alloy"
  },

  // Fiber Level
  Multifilament: {
    title: "Multifilament Fiber",
    description: "Fibers made by twisting or braiding many tiny, continuous micro-filaments together. Extremely flexible and soft, commonly used in traditional nylon nets to prevent fish skin damage.",
    imageUrl: "https://placehold.co/600x400/0ea5a4/ffffff?text=Multifilament+Fiber"
  },
  Monofilament: {
    title: "Monofilament Fiber",
    description: "A single, solid strand of synthetic fiber (similar to heavy fishing line) or metal wire. Stiffer than multifilament, offering better water flow and less surface area for biofouling.",
    imageUrl: "https://placehold.co/600x400/ffd43b/333333?text=Monofilament+Fiber"
  },
  "Split-film": {
    title: "Split-film Fiber",
    description: "Fibers created by extruding a thin polymer sheet, orienting it, and splitting it mechanically. Highly cost-effective and provides a rougher texture for better knot holding.",
    imageUrl: "https://placehold.co/600x400/8b5cf6/ffffff?text=Split-film+Fiber"
  },

  // Yarn/Twine Level
  Yarn: {
    title: "Yarn",
    description: "An intermediate spun thread made from multifilament fibers, prepared and aligned to be twisted or braided into robust netting twine.",
    imageUrl: "https://placehold.co/600x400/61e786/333333?text=Yarn+Spools"
  },
  "Twisted twine": {
    title: "Twisted Twine",
    description: "Two or more yarns twisted together under tension. Provides good elasticity and shock absorption, making it a traditional standard for knotted netting.",
    imageUrl: "https://placehold.co/600x400/475569/ffffff?text=Twisted+Twine"
  },
  "Braided twine": {
    title: "Braided Twine",
    description: "Yarns interwoven in a tubular structure. Stronger and more abrasion-resistant than twisted twine, with no tendency to unroll or twist under heavy loads.",
    imageUrl: "https://placehold.co/600x400/4dabf7/ffffff?text=Braided+Twine"
  },

  // Net Manufacturing
  Knitting: {
    title: "Knitting (Raschel)",
    description: "A machine-manufacturing process that creates knotless netting by interlocking loops of yarn. Raschel knitting is the dominant standard for modern, fish-friendly aquaculture.",
    imageUrl: "https://placehold.co/600x400/61e786/333333?text=Knitting+Process"
  },
  Weaving: {
    title: "Weaving",
    description: "Interlacing warp and weft threads at right angles. Often used for specialized barrier nets or heavy-duty semi-rigid monofilament structures (like PET wire nets).",
    imageUrl: "https://placehold.co/600x400/4dabf7/ffffff?text=Weaving+Process"
  },
  Knotting: {
    title: "Knotting",
    description: "The traditional method of tying twines together at intersections to form meshes. Creates bulky knots that hold shape well but can cause abrasive injuries to fish.",
    imageUrl: "https://placehold.co/600x400/475569/ffffff?text=Knotting+Process"
  },

  // Mesh Connection & Shape
  Knotless: {
    title: "Knotless Mesh",
    description: "Netting where the intersections are knitted or woven rather than physically tied. Smoother, lighter, stronger at the joints, and much safer for delicate fish skin.",
    imageUrl: "https://placehold.co/600x400/61e786/333333?text=Knotless+Mesh"
  },
  Knotted: {
    title: "Knotted Mesh",
    description: "Netting featuring physical knots at each mesh intersection. While highly repairable, it is heavier and highly prone to accumulating biofouling at the knots.",
    imageUrl: "https://placehold.co/600x400/475569/ffffff?text=Knotted+Mesh"
  },
  "Rhombus (Square)": {
    title: "Rhombus (Square) Mesh",
    description: "Diamond or square-shaped mesh configuration. The most common structural shape, though diamond meshes can close up under tension and restrict water flow if not hung correctly.",
    imageUrl: "https://placehold.co/600x400/61e786/333333?text=Rhombus+Mesh"
  },
  Hexagonal: {
    title: "Hexagonal Mesh",
    description: "Six-sided honeycomb mesh structure. Offers superior structural stability, highly resists tearing (laddering), and inherently keeps meshes open even in severe ocean currents.",
    imageUrl: "https://placehold.co/600x400/4dabf7/ffffff?text=Hexagonal+Mesh"
  },

  // Treatments
  Untreated: {
    title: "Untreated Netting",
    description: "Netting deployed without chemical antifouling coatings. Requires frequent manual or robotic in-situ underwater cleaning to prevent biofouling from suffocating the fish.",
    imageUrl: "https://placehold.co/600x400/475569/ffffff?text=Untreated+Net"
  },
  "Antifouling Treatment": {
    title: "Antifouling Coatings",
    description: "These treatments prevent biofouling (growth of algae, mussels, and hydroids) on the nets. While essential for maintaining water flow and oxygen levels inside the pens, they require careful environmental management due to traditional copper leaching concerns.",
    imageUrl: "https://placehold.co/600x400/61e786/333333?text=Antifouling+Process"
  },

  // End-of-Life
  Recyclable: {
    title: "Recyclable",
    description: "Nets made from pure materials (like clean nylon or HDPE) that can be melted down, pelletized, and repurposed into new plastic products at the end of their lifecycle.",
    imageUrl: "https://placehold.co/600x400/61e786/333333?text=Recyclable"
  },
  "Non-recyclable": {
    title: "Non-recyclable",
    description: "End-of-life nets that cannot be easily recycled due to severe heavy metal contamination (copper coatings), severe UV degradation, or mixed material compositions.",
    imageUrl: "https://placehold.co/600x400/ff6b6b/ffffff?text=Non-recyclable"
  }
};