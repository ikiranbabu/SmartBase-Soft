import "jquery-slimscroll";

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";


import { LayoutComponent } from "./layout.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ChatSidebarComponent } from "./chat-sidebar/chat-sidebar.component";
import { ChatMessageComponent } from "./chat-sidebar/chat-message/chat-message.component";
import { SearchPipe } from "./pipes/search.pipe";
import { NotificationLoadDirective } from "./notifications/notifications-load.directive";
import { NotificationsComponent } from "./notifications/notifications.component";
import { RouterModule } from "@angular/router";
import { routes } from "./layout.route";
import { SmartsoftSharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        SmartsoftSharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        NavbarComponent,
        ChatSidebarComponent,
        SearchPipe,
        NotificationsComponent,
        NotificationLoadDirective,
        ChatMessageComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule {
}
