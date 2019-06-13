import { NgModule } from '@angular/core';

// Import here all the components you want to use in other files
import { CanvasComponent } from './canvas/canvas.component';

@NgModule({
    declarations: [CanvasComponent],
    exports: [CanvasComponent]
})

export class ComponentsModule{}