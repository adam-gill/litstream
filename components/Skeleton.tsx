import { cn } from "@/lib/utils";

interface Styles {
  className: string;
}

const Skeleton: React.FC<Styles> = ({ className }) => {
  return <div className={cn("skeleton-box", className)}></div>;
};

export default Skeleton;
