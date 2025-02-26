import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <div>
      <ul>
        <li>Última atualização : {updatedAtText}</li>
      </ul>
    </div>
  );
}
function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let DatabaseStatusInformation = "Carregando...";
  if (!isLoading && data) {
    DatabaseStatusInformation = (
      <>
        <ul>
          <li>Versão: {data.dependencies.database.version}</li>
          <li>
            Conexões abertas: {data.dependencies.database.opened_connections}
          </li>
          <li>
            Conexões máximas: {data.dependencies.database.max_connections}
          </li>
        </ul>
      </>
    );
  }
  return (
    <div>
      <h2>Database</h2>
      {DatabaseStatusInformation}
    </div>
  );
}
