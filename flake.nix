{
  description = "NodeJS Memory DB";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        nodeDependencies =
          (pkgs.callPackage ./default.nix { }).nodeDependencies;
      in {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs
            node2nix
            nodePackages.typescript
            nodePackages.typescript-language-server
            nodePackages.prettier
            nodeDependencies
          ];
        };
      });
}
