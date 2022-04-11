import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer">
            <div class="p-grid">
                <div class="p-col">
                    <span class="layout-footer-appname">Potres 2020 v1.6</span>
                </div>
                <div class="p-col p-col-align-right">
                    <span class="ui-icon-copyright"></span>
                    <span> 2020 Matrica d.o.o.</span>
                </div>
            </div>
        </div>
    `
})
export class AppFooterComponent {

}
