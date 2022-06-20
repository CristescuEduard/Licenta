import { memo, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Box } from "./Box.js";
import { ItemTypes } from "./ItemTypes.js";
function getStyles(tableX, tableY, isDragging) {
    const transform = `translate3d(${tableX}px, ${tableY}px, 0)`;
    return {
        position: "absolute",
        transform,
        WebkitTransform: transform,
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : "",
    };
}

export const DraggableBox = memo(function DraggableBox(props) {
    const { id, id1, tableName, tableX, tableY, orientation, tableSize } =
        props;
    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: ItemTypes.BOX,
            item: { id, tableX, tableY, tableName, orientation, tableSize },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [id, tableX, tableY, tableName, orientation, tableSize]
    );
    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    return (
        <div ref={drag} style={getStyles(tableX, tableY, isDragging)}>
            <Box
                tableName={tableName + " " + props.id1}
                orientation={orientation}
                tableSize={tableSize}
            />
        </div>
    );
});
