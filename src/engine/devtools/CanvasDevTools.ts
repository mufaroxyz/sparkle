import {ImGui, ImGui_Impl} from "@zhobo63/imgui-ts";
import {Game} from "../objects/Game.ts";

// const text = new ImGui.ImStringBuffer(128, "Hello, world!");
// const text_area = new ImGui.ImStringBuffer(128, "Hello, world!");

const clear_color = new ImGui.ImVec4(0.141, 0.141, 0.141, 0.87);

export async function mountCanvasDevTools(game: Game) {
    init_dom();

    await ImGui.default();
    ImGui.CreateContext();
    const io = ImGui.GetIO();
    ImGui.StyleColorsDark();
    io.Fonts.AddFontDefault();
    io.FontGlobalScale = 1.0;

    const canvas = document.getElementById('dev-canvas') as HTMLCanvasElement;
    ImGui_Impl.Init(canvas);
    window.requestAnimationFrame((t) => render(t, game));
}

async function render(time: number, game: Game) {
    ImGui_Impl.NewFrame(time);
    ImGui.NewFrame();
    ImGui.Begin("Canvas Dev Tools");
    ImGui.Text("ImGui Version " + ImGui.VERSION);
    ImGui.Text("canvas:width " + game.getWidth());
    ImGui.Text("canvas:height " + game.getHeight());
    ImGui.Text("CurrentScene " + game.getCurrentSceneId());
    ImGui.End();
    ImGui.EndFrame();
    ImGui.Render();

    const gl = ImGui_Impl.gl;
    gl && gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl && gl.clearColor(clear_color.x, clear_color.y, clear_color.z, clear_color.w);
    gl && gl.clear(gl.COLOR_BUFFER_BIT);
    ImGui_Impl.RenderDrawData(ImGui.GetDrawData());
    window.requestAnimationFrame((t) => render(t, game));
}

function init_dom() {
    const devTools = document.querySelector('#dev-tools') || document.createElement('div');
    devTools.id = 'dev-tools';

    const canvas = document.createElement('canvas');
    canvas.id = 'dev-canvas';

    devTools.appendChild(canvas);

    document.body.appendChild(devTools);
}
