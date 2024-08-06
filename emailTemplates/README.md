# Email Templates

This dir contains Fixit-related HTML email templates for various purposes. The templates are written in [Handlebars-flavored](https://handlebarsjs.com/) HTML and CSS for use in AWS [Pinpoint](https://docs.aws.amazon.com/pinpoint/latest/developerguide/welcome.html) and [SES](https://docs.aws.amazon.com/ses/latest/dg/Welcome.html), and are designed to work across all of the most commonly-used email clients.

## Email Client Constraints

Email clients are relatively limited in their support for modern web features, and the list of supported features varies greatly from client to client. Many common staples of modern web design, like JavaScript, CSS Grid/Flexbox, and even image formats like SVG and WebP, are simply not supported by many email clients.

<!-- prettier-ignore -->
> [!TIP]
> **[CanIEmail.com](https://www.caniemail.com/) is an _excellent_ reference for checking email client support for various web features.**

To ensure emails achieve their intended user impact, HTML emails must implement the desired UI/UX with these constraints in mind to ensure recipients aren't presented with rendering/formatting issues.

## Available Templates

| Template                           | Purpose                                             |
| ---------------------------------- | --------------------------------------------------- |
| `new-user-welcome-email.html`      | Welcomes newly-registered user to Fixit             |
| `checkout-confirmation-email.html` | Confirms subscription info upon successful checkout |
| `fixit-user-invitation-email.html` | Invites the recipient to join Fixit                 |
