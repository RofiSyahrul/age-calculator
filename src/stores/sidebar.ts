import { writable } from 'svelte/store';

const isSidebarOpen = writable(false);

export function subscribeSidebarStore() {
  return isSidebarOpen.subscribe(isOpen => {
    if (isOpen) document.body.setAttribute('data-sidebar-open', '');
    else document.body.removeAttribute('data-sidebar-open');
  });
}

export function toggleSidebar() {
  isSidebarOpen.update(prev => !prev);
}
