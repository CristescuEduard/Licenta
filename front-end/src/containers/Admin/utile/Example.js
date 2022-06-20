import { useState } from "react";
import { Container } from "./Container.js";
import { CustomDragLayer } from "./CustomDragLayer.js";
export const Example = ({ idLayout }) => {
    const [snapToGridAfterDrop, setSnapToGridAfterDrop] = useState(true);
    const [snapToGridWhileDragging, setSnapToGridWhileDragging] =
        useState(true);

    return (
        <div>
            <Container snapToGrid={snapToGridAfterDrop} idLayout={idLayout} />
            <CustomDragLayer snapToGrid={snapToGridWhileDragging} />
        </div>
    );
};

export default Example;
