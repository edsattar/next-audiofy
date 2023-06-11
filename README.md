```
/app
  {app-layout}
  <ToasterProvider>
    ├<SupabaseProvider>
    └<UserProvider>
      ├<ModalProvider>
      └<Sidebar {app-page}>
        ├<Box-1>
        │ ├<SidebarItem-1>
        │ └<SidebarItem-n>
        ├<Box-2>
        │ └<Library>
        └{app-page} # shouldnt be inside sidebar
          ├<Header> "Welcome Back"
          │ ├<NavButtons><AuthButtons>
          │ └<ListItem> "Liked Songs"
          ├<Main>
          │ ├<TodoList>
          │ │ ├<TodoItem>
          │ │ └<TodoItem>
          │ └<TodoList>
          │   ├<TodoItem>
          │   └<TodoItem>
          └<Footer>
```
