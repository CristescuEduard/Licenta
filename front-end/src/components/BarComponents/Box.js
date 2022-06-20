import { memo } from "react";
import { Box } from "./Table";

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

export const DraggableBox = memo(function DraggableBox({ boxes, box }) {
    return (
        <div style={getStyles(box.tableX, box.tableY, false)}>
            <Box
                tableName={box.tableName}
                orientation={box.orientation}
                tableSize={box.tableSize}
                boxes={boxes}
                box={box}
            />
        </div>
    );
});
