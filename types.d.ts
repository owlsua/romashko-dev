declare module '*.css' {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}

declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
