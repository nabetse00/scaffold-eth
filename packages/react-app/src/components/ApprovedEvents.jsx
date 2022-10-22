import { List } from "antd";
import { useEventListener } from "eth-hooks/events/useEventListener";
import { Address, TokenBalance } from ".";

/*
  ~ What it does? ~

  Displays a lists of approved events

  ~ How can I use? ~

  <ApprovedEvents
    contracts={readContracts}
    contractName="YourContract"
    eventName="SetPurpose"
    localProvider={localProvider}
    mainnetProvider={mainnetProvider}
    startBlock={1}
  />
*/

export default function ApprovedEvents({ contracts, contractName, eventName, localProvider, mainnetProvider, startBlock }) {
  // 📟 Listen for broadcast events
  const events = useEventListener(contracts, contractName, eventName, localProvider, startBlock);
  return (
    <div style={{ width: 600, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
      <h2>
        {eventName} Events
        <br />
        {
          "🆗🎈 Owner | Spender | Balloons Amount | Status"
        }
      </h2>
      <List
        bordered
        dataSource={events}
        renderItem={item => {
          return (
            <List.Item key={item.blockNumber + "_" + item.args[0].toString()}>
              <Address address={item.args[0]} ensProvider={mainnetProvider} fontSize={16} />
              <Address address={item.args[1]} ensProvider={mainnetProvider} fontSize={16} />
              <TokenBalance balance={item.args[2]} provider={localProvider} />
              <span>
                {item.args[3] ? "👍" : "👎"}
              </span>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
