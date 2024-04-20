import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import Konva from 'konva';

function Canvas() {
    const [brushColor, setBrushColor] = useState('#000000');
    const [stage, setStage] = useState(null);
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [linesLayer, setLinesLayer] = useState(null);
    const [drawnLines, setDrawnLines] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastLine, setLastLine] = useState(null);

    useEffect(() => {
        function updateStageSize() {
            const container = document.getElementById('container');
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            const newStage = new Konva.Stage({
                container: 'container',
                width: width,
                height: height,
            });

            const newLinesLayer = new Konva.Layer();
            newStage.add(newLinesLayer);

            setStage(newStage);
            setLinesLayer(newLinesLayer);
        }

        updateStageSize();
        window.addEventListener('resize', updateStageSize);

        return () => {
            window.removeEventListener('resize', updateStageSize);
        };
    }, []);

    const handleMouseDown = (e) => {
        setIsDrawing(true);
        const pos = stage.getPointerPosition();
        const newLine = new Konva.Line({
            stroke: brushColor,
            strokeWidth: 5,
            points: [pos.x, pos.y],
            lineCap: 'round',
            lineJoin: 'round',
        });
        setLastLine(newLine);
        linesLayer.add(newLine);
        setDrawnLines([...drawnLines, newLine]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;

        const pos = stage.getPointerPosition();
        let newPoints = lastLine.points().concat([pos.x, pos.y]);
        lastLine.points(newPoints);
        linesLayer.batchDraw();
    };

    const handleMouseUp = (e) => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        linesLayer.destroyChildren();
        stage.batchDraw();
        setDrawnLines([]);
    };

    const undoDraw = () => {
        if (drawnLines.length === 0) return;

        const lastDrawnLine = drawnLines.pop();
        lastDrawnLine.remove();
        stage.batchDraw();
    };

    const toggleColorPicker = () => {
        setColorPickerVisible((prevVisible) => !prevVisible);
    };

    return (
        <section className="canvasSection">
            <h2>Canvas</h2>
            <div id="canvasContainer" className="canvasContainer">
                <div>
                    Tool:
                    <select id="tool">
                        <option value="brush">Brush</option>
                        <option value="eraser">Eraser</option>
                    </select>
                    Color: 
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <button onClick={toggleColorPicker}>Palette</button>
                        {colorPickerVisible && (
                            <div style={{ position: 'absolute', zIndex: 1 }}>
                                <HexColorPicker color={brushColor} onChange={setBrushColor} />
                            </div>
                        )}
                    </div>
                    <button onClick={clearCanvas}>Clear Canvas</button>
                    <button onClick={undoDraw}>Undo</button>
                </div>
                <div
                    id="container"
                    className="canvasContainer"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchMove={handleMouseMove}
                    onTouchEnd={handleMouseUp}
                />
            </div>
        </section>
    );
}

export default Canvas;
