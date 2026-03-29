import { AnimatedLayerButton } from "@/components/ui/animated-layer-button";

export default function AnimatedLayerButtonDemo() {
  return (
    <div className="flex min-h-[250px] w-full items-center justify-center bg-background p-10">
      <AnimatedLayerButton>
        Hover Me
      </AnimatedLayerButton>
    </div>
  );
}
