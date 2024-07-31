declare namespace JSX {
    interface IntrinsicElements {
      "include": any;
    }
  }
  
  declare global {
    namespace NodeJS {
      interface Global {
        include: any;
      }
    }
  }