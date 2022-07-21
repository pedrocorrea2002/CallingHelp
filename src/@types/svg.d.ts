declare module "*.svg" {
    import React from 'react';
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
}

//! A FUNÇÃO DESSE CÓDIGO É PERMITIR QUE O INTELESENSE ACEITE O USO DE SVG NO PROJETO SEM MOSTRAR ERRO