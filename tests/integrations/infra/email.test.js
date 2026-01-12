import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "FinTab <contato@fintab.com.br>",
      to: "contato@curso.dev",
      subject: "Teste de assunto",
      text: "Teste de corpo do email",
      html: "<strong>Teste de corpo do email de teste</strong>",
    });

    await email.send({
      from: "FinTab <contato@fintab.com.br>",
      to: "contato@curso.dev",
      subject: "Último email enviado",
      text: "Corpo do Último email",
      html: "<strong>Teste Do Último email</strong>",
    });

    const lastEmail = await orchestrator.getLastEmail();
    expect(lastEmail.sender).toBe("<contato@fintab.com.br>");
    expect(lastEmail.recipients[0]).toBe("<contato@curso.dev>");
    expect(lastEmail.subject).toBe("Último email enviado");
    expect(lastEmail.text).toContain("Corpo do Último email");
  });
});
