import { MarketplaceComponent } from "@/components/marketplace";
import { Navback } from "@/components/NavBack";
export default function Market() {
  return (
    <>
      <Navback title="back" href="/" />
      <MarketplaceComponent />
    </>
  );
};
