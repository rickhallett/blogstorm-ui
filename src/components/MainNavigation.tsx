"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileEdit,
  Calendar,
  Settings,
  LogOut,
  Menu,
  User,
  ChevronRight,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth/provider";
interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Content",
    href: "/content",
    icon: FileEdit,
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: Calendar,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function MainNavigation() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const { user } = useAuth();

  return (
    <>
      {/* Desktop Navigation */}
      <header className="hidden md:flex h-16 items-center px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-6 flex-1">
          {/* Brand */}
          <div className="flex-shrink-0">
            {" "}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">BlogStorm</span>
            </Link>
          </div>

          {/* Main Navigation Links */}
          <nav className="flex items-center gap-4">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const ItemIcon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <ItemIcon className="w-4 h-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {/* Enhanced Mobile Navigation */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild className="md:hidden fixed top-4 left-4">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:w-80 p-0">
          <SheetHeader className="p-6 border-b">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <SheetTitle className="text-base font-medium">
                  {user?.name}
                </SheetTitle>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </SheetHeader>

          <div className="px-2 py-4">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                const ItemIcon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-md text-sm transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <ItemIcon className="w-4 h-4" />
                      {item.title}
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}
            </nav>

            <Separator className="my-4" />

            {/* User-specific actions */}
            <nav className="space-y-1">
              <Link
                href="/profile"
                className="flex items-center justify-between px-4 py-3 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <User className="w-4 h-4" />
                  Profile
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
            </nav>
          </div>

          <SheetFooter className="p-6 border-t mt-auto">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-red-600 hover:text-red-600 hover:bg-red-50"
              onClick={() => {
                /* Implement logout */
              }}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
