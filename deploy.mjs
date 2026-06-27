import os from "os";

// Cleanse process.env to remove any environment variables containing non-ASCII characters
for (const key in process.env) {
  const value = process.env[key];
  if (value) {
    let hasNonAscii = false;
    for (let i = 0; i < value.length; i++) {
      if (value.charCodeAt(i) > 255) {
        hasNonAscii = true;
        break;
      }
    }
    for (let i = 0; i < key.length; i++) {
      if (key.charCodeAt(i) > 255) {
        hasNonAscii = true;
        break;
      }
    }
    if (hasNonAscii) {
      console.log(`Cleansing environment variable: ${key}`);
      delete process.env[key];
    }
  }
}

// Override the hostname method to return an ASCII name
os.hostname = () => "project-think-pc";

// Mock network interfaces to prevent adapter name Unicode crashes
os.networkInterfaces = () => {
  return {
    lo: [
      {
        address: "127.0.0.1",
        netmask: "255.0.0.0",
        family: "IPv4",
        mac: "00:00:00:00:00:00",
        internal: true,
        cidr: "127.0.0.1/8",
      },
    ],
  };
};

console.log("Starting Vercel CLI with hostname and network overrides...");

// Import and execute Vercel CLI
import("./node_modules/vercel/dist/vc.js");
