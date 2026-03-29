three.js assets folder (optional)

This project uses procedural geometry in js/three-scene.js.
If you want to add real 3D models later (GLB/GLTF), place them here.

Suggested workflow:
- Export GLB (binary glTF) from Blender
- Optimize with:
  - Reduce polygons
  - Use compressed textures
  - Consider Draco / Meshopt (advanced)
- Load in three.js via GLTFLoader (Stage 2 concepts)

Keep 3D decorative unless your product is truly 3D.