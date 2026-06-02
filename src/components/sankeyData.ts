// src/components/sankeyData.ts

export interface NodeContent {
  title: string;
  description: string;
  imageUrl?: string;
}

export const NODE_DETAILS: Record<string, NodeContent> = {
  PA6: {
    title: "Polyamide 6 (Nylon 6)",
    description: "PA6 is widely used in aquaculture netting due to its high tensile strength, excellent elasticity, and abrasion resistance. However, it absorbs water, which can slightly reduce its breaking strength over prolonged submersed periods.",
    imageUrl: "https://placehold.co/400x250?text=PA6+Microstructure"
  },
  HDPE: {
    title: "High-Density Polyethylene",
    description: "HDPE is highly valued in fish farming cages because it does not absorb water, retains 100% of its strength when wet, and naturally floats. It offers superb chemical resistance and UV stability.",
    imageUrl: "https://placehold.co/400x250?text=HDPE+Cage+Netting"
  },
  "Antifouling Treatment": {
    title: "Antifouling Coatings",
    description: "These treatments prevent biofouling (growth of algae, mussels, and hydroids) on the nets. While essential for maintaining water flow and oxygen levels inside the pens, they require careful environmental management due to traditional copper leaching concerns.",
    imageUrl: "https://placehold.co/400x250?text=Antifouling+Process"
  },

  "Polyethylene family": {
    title: "Polyethylene family",
    description: "This category includes various polyethylene materials used in aquaculture netting, each with distinct properties suitable for different applications.",
    imageUrl: "https://scrapc.com/wp-content/uploads/2024/02/Types-of-PE-1024x1024.jpg"
  }
  // Easily add, edit, or remove your node definitions here cleanly!

  // Easily add, edit, or remove your node definitions here cleanly!
};