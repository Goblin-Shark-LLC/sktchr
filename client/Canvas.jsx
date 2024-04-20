import React, { useEffect, useState } from 'react';
// import { HexColorPicker } from 'react-colorful';
// import Konva from 'konva';


// function Canvas() {
//     const [brushColor, setBrushColor] = useState('#000000');
//     const [stage, setStage] = useState(null);
//     const [colorPickerVisible, setColorPickerVisible] = useState(false);
//     const [linesLayer, setLinesLayer] = useState(null);
//     const [drawnLines, setDrawnLines] = useState([]);
//     const [isDrawing, setIsDrawing] = useState(false);
//     const [lastLine, setLastLine] = useState(null);

//     useEffect(() => {
//         function updateStageSize() {
//             let container = document.getElementById('canvasContainer');
//             let width = container.offsetWidth;
//             let height = container.offsetHeight;
//             //staging. Renders canvas and renders anything drawn to it, too
//             let newStage = new Konva.Stage({
//                 container: 'container',
//                 width: width,
//                 height: height,
//             });

//             setStage(newStage);

//             let layer = new Konva.Layer();
//             newStage.add(layer);

//             let isPaint = false;
//             let mode = 'brush';
//             let lastLine;

//             lines.forEach((line) => layer.add(line));

//             newStage.on('mousedown touchstart', function (e) {
//                 isPaint = true;
//                 let pos = newStage.getPointerPosition();
//                 lastLine = new Konva.Line({
//                     stroke: brushColor, 
//                     strokeWidth: 5,
//                     globalCompositeOperation:
//                         mode === 'brush' ? 'source-over' : 'destination-out',
//                     lineCap: 'round',
//                     lineJoin: 'round',
//                     points: [pos.x, pos.y, pos.x, pos.y],
//                 });
//                 layer.add(lastLine);
//             });

//             newStage.on('mouseup touchend', function () {
//                 isPaint = false;
//                 setLines((prevLines) => [...prevLines, lastLine])
//             });

//             newStage.on('mousemove touchmove', function (e) {
//                 if (!isPaint) {
//                     return;
//                 }
//                 e.evt.preventDefault();
//                 const pos = newStage.getPointerPosition();
//                 let newPoints = lastLine.points().concat([pos.x, pos.y]);
//                 lastLine.points(newPoints);
//                 layer.batchDraw();
//             });

//             let selectTool = document.getElementById('tool');
//             selectTool.addEventListener('change', function () {
//                 mode = selectTool.value;
//             });

//             let selectColor = document.getElementById('color'); 
//             selectColor.addEventListener('change', function () {
//                 setBrushColor(selectColor.value); // updates the brush color finally works
//             });

//             document.getElementById('undoButton').addEventListener('click', function () {
//                 if (lines.length > 0) {
//                     let lastDrawnLine = lines.pop();
//                     lastDrawnLine.destroy();
//                     layer.batchDraw();
//                     setLines([...lines])
//                 }
//             });
//         }
//         updateStageSize();
//         window.addEventListener('resize', updateStageSize);
//         return () => window.removeEventListener('resize', updateStageSize);
//     }, [brushColor, lines]);

//     useEffect(() => {
//         function saveHandler() {
//             // Check if stage exists
//             if (stage) {
//                 // Get the image data URL from the stage
//                 let dataURL = stage.toDataURL({ mimeType: 'image/png' });

//                 // Send the image data to the server using a POST request
//                 fetch('/posts/upload', {
//                     method: 'POST',
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({imgData: dataURL}),
//                 })
//                 .then(response => {
//                     if (response.ok) {
//                         // Image was successfully uploaded
//                         console.log('Image uploaded successfully');
//                     } else {
//                         // Handle error response
//                         console.error('Error uploading image:', response.statusText);
//                     }
//                 })
//                 .catch(error => {
//                     // Handle network error
//                     console.error('Network error:', error);
//                 });
//             }
//         }
    

//         const saveButton = document.getElementById('saveButton');
//         saveButton.addEventListener('click', saveHandler);
//         //stops drawing save loop
//         return () => {
//             saveButton.removeEventListener('click', saveHandler);
//         };
//     }, [stage]);
    
//     return (
//         <section className="canvasSection">
//             <h2>Canvas</h2>
//             <div id="canvasContainer" className="canvasContainer">
//             {/* <meta charSet="utf-8" />
//             <title>Konva Free Drawing Demo</title>
//             <style
//                 dangerouslySetInnerHTML={{
//                     __html:
//                         "\n      body {\n        margin: 0;\n        padding: 0;\n        overflow: hidden;\n        background-color: #f0f0f0;\n      }\n      #container {\n        border: 1px solid black;\n        width: 50vw;\n        height: 30vh;\n      }\n    "
//                 }}
//             /> */}
//             <div>
//                 Tool:
//                 <select id="tool">
//                     <option value="brush">Brush</option>
//                     <option value="eraser">Eraser</option>
//                 </select>
//                 Color:
//                 <select id="color">
//                     <option value="#000000">Black</option>
//                     <option value="#ff0000">Red</option>
//                     <option value="#0000ff">Blue</option>
//                     <option value="#ffff00">Yellow</option>
//                 </select>
//                 <button id="undoButton">Undo</button>
//                 <button id="saveButton">Post</button>
//             </div>
//             <div id="container" className="canvasContainer" />

//             </div>
//         </section>
//     );
// };

// export default Canvas;

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
            const container = document.getElementById('canvasContainer');
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
    useEffect(() => {
                function saveHandler() {
                    // Check if stage exists
                    if (stage) {
                        // Get the image data URL from the stage
                        let dataURL = stage.toDataURL({ mimeType: 'image/png' });
        
                        // Send the image data to the server using a POST request
                        fetch('/posts/upload', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({imgData: dataURL}),
                        })
                        .then(response => {
                            if (response.ok) {
                                // Image was successfully uploaded
                                console.log('Image uploaded successfully');
                            } else {
                                // Handle error response
                                console.error('Error uploading image:', response.statusText);
                            }
                        })
                        .catch(error => {
                            // Handle network error
                            console.error('Network error:', error);
                        });
                    }
                }
            
        
                const saveButton = document.getElementById('saveButton');
                saveButton.addEventListener('click', saveHandler);
                //stops drawing save loop
                return () => {
                    saveButton.removeEventListener('click', saveHandler);
                };
            }, [stage]);


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
                    <button id="saveButton">Post</button>

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