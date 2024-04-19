import React, { useEffect, useState } from 'react';
import Konva from 'konva';


function Canvas() {
    const [brushColor, setBrushColor] = useState('#000000'); //saves color to canvas
    const [lines, setLines] = useState([]); //saves line x/y position
    const [stage, setStage] = useState(null); //canvas state
    

    useEffect(() => {
        function updateStageSize() {
            let container = document.getElementById('container');
            let width = container.offsetWidth;
            let height = container.offsetHeight;
            //staging. Renders canvas and renders anything drawn to it, too
            let newStage = new Konva.Stage({
                container: 'container',
                width: width,
                height: height,
            });

            setStage(newStage);

            let layer = new Konva.Layer();
            newStage.add(layer);

            let isPaint = false;
            let mode = 'brush';
            let lastLine;

            lines.forEach((line) => layer.add(line));

            newStage.on('mousedown touchstart', function (e) {
                isPaint = true;
                let pos = newStage.getPointerPosition();
                lastLine = new Konva.Line({
                    stroke: brushColor, 
                    strokeWidth: 5,
                    globalCompositeOperation:
                        mode === 'brush' ? 'source-over' : 'destination-out',
                    lineCap: 'round',
                    lineJoin: 'round',
                    points: [pos.x, pos.y, pos.x, pos.y],
                });
                layer.add(lastLine);
            });

            newStage.on('mouseup touchend', function () {
                isPaint = false;
                setLines((prevLines) => [...prevLines, lastLine])
            });

            newStage.on('mousemove touchmove', function (e) {
                if (!isPaint) {
                    return;
                }
                e.evt.preventDefault();
                const pos = newStage.getPointerPosition();
                let newPoints = lastLine.points().concat([pos.x, pos.y]);
                lastLine.points(newPoints);
                layer.batchDraw();
            });

            let selectTool = document.getElementById('tool');
            selectTool.addEventListener('change', function () {
                mode = selectTool.value;
            });

            let selectColor = document.getElementById('color'); 
            selectColor.addEventListener('change', function () {
                setBrushColor(selectColor.value); // updates the brush color finally works
            });

            document.getElementById('undoButton').addEventListener('click', function () {
                if (lines.length > 0) {
                    let lastDrawnLine = lines.pop();
                    lastDrawnLine.destroy();
                    layer.batchDraw();
                    setLines([...lines])
                }
            });
        }
        updateStageSize();
        window.addEventListener('resize', updateStageSize);
        return () => window.removeEventListener('resize', updateStageSize);
    }, [brushColor, lines]);

    useEffect(() => {
        // function saveHandler() {

        function saveHandler() {
            // Check if stage exists
            if (stage) {
                // Get the image data URL from the stage
                let dataURL = stage.toDataURL({ mimeType: 'image/png' });
                console.log('dataURL:', dataURL)

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
        
        //save post
        // if (stage) {
        //     let dataURL = stage.toDataURL({ mimeType: 'image/png' });
        //     let a = document.createElement('a');
        //     a.href = dataURL;
        //     a.download = 'drawing.png';
        //     document.body.appendChild(a);
        //     a.click();
        //     document.body.removeChild(a);
        // }

        const saveButton = document.getElementById('saveButton');
        saveButton.addEventListener('click', saveHandler);
        //stops drawing save loop
        return () => {
            saveButton.removeEventListener('click', saveHandler);
        };
    }, [stage]);
    
    return (
        <>
            <meta charSet="utf-8" />
            <title>Konva Free Drawing Demo</title>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n      body {\n        margin: 0;\n        padding: 0;\n        overflow: hidden;\n        background-color: #f0f0f0;\n      }\n      #container {\n        border: 1px solid black;\n        width: 100vw;\n        height: 100vh;\n      }\n    "
                }}
            />
            <div>
                Tool:
                <select id="tool">
                    <option value="brush">Brush</option>
                    <option value="eraser">Eraser</option>
                </select>
                Color:
                <select id="color">
                    <option value="#000000">Black</option>
                    <option value="#ff0000">Red</option>
                    <option value="#0000ff">Blue</option>
                    <option value="#ffff00">Yellow</option>
                </select>
                <button id="undoButton">Undo</button>
                <button id="saveButton">Save</button>
            </div>
            <div id="container" />
        </>
    );
};

export default Canvas;
