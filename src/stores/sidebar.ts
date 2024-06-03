import { writable } from 'svelte/store';

const isSidebarOpen = writable(false);

export function subscribeSidebarStore(doc: Document) {
  return isSidebarOpen.subscribe(isOpen => {
    if (isOpen) doc.body.setAttribute('data-sidebar-open', '');
    else doc.body.removeAttribute('data-sidebar-open');
  });
}

export function toggleSidebar() {
  isSidebarOpen.update(prev => !prev);
}
