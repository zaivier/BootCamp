# Recuperação de Senha

**RF**
- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usário deve poder resetar sua senha;
**RNF**
- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**
- O link enviado por email para resetar senha deve expirar em duas Horas(2h);
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do Perfil
**RF**
- O usuário deve poder atualizar seu perfil(nome, email, senha)

**RNF**
**RN**
- O usuário não pode alterar seu e-mail para um e-mail ja utilizado;
- Para atualizar sua senha o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do Prestador
**RF**
- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**
- Os agendamentos do prestador do dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazernadas no MongoDb;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;
**RN**
- A notificação deve ter um status de lida e não lida para que o prestador possa controlar;


# Agendamento de Serviços
**RF**
- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com horário pelo menos um horário disponível de um prestador;
- o usuário deve poder listar horários disponíveis em um dia especifico de um prestador;
- O usuário deve poder realizar um novo agengamento com um prestador;
**RNF**
- A listagem de prestadores deve armazenada em cache;

**RN**
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (primeiro às 8h, último as 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já pssou;
- O Usuário não pode agendar serviços consigo mesmo;

