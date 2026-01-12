import http.server
import socketserver
import webbrowser
import os

PORT = 5000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    print(f"\n✅ Servidor escuchando en: http://localhost:{PORT}\n")
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        webbrowser.open(f"http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")
