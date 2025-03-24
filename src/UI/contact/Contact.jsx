export default function Contact() {
  return (
    <div>
      <h1>Contact</h1>
      <form>
        <label>Name:</label>
        <br />
        <input type="text" name="name" />
        <br />
        <label>Email:</label>
        <br />
        <input type="email" name="email" />
        <br />
        <label>Message:</label>
        <br />
        <textarea name="message"></textarea>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
