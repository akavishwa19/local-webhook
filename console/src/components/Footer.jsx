const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Webhook Monitoring System</p>
            <p>Secure webhook tracking with signature verification</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>System Active</span>
            </div>
            <span>© 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

