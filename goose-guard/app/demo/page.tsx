export default function Demo() {
  return (
    <form action="/api/upload" encType="multipart/form-data" method="post">
      <input id="file" name="file" type="file"/>
      <button>Upload</button>
    </form>
  );
}
