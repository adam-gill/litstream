import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PageContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full py-10">
      <div className="w-full max-w-6xl px-6 mx-auto">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
