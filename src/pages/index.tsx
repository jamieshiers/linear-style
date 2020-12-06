import { ThemeCardGrid } from "../components/ThemeCard";
import { useInputFilter, useLinearThemes } from "../core/hooks";
import { Theme } from "../molecules/Theme";
import { getBrightness } from "../core/utils";

export default function Index() {
  const { data: themes } = useLinearThemes();

  const entries = Object.entries(themes ?? {});

  const { state, setState, filtered } = useInputFilter((theme, i, s) => {
    const [name, colors] = theme;
    s = s.toLowerCase();

    if ("light".includes(s)) {
      const [background] = colors.split(",");
      return getBrightness(background) > 50;
    }

    if ("dark".includes(s)) {
      const [background] = colors.split(",");
      return getBrightness(background) < 50;
    }

    return (colors + name).toLowerCase().includes(s);
  }, entries);

  if (!themes)
    return (
      <div className="app">
        <h1 className={"title"}>Linear Style</h1>
        <span className="subtitle">🧪 Hold up! Fetching the latest themes...</span>
      </div>
    );

  return (
    <div className="app">
      <h1 className="title">Linear Style</h1>
      <span className="subtitle">Click on a theme to copy it. Then, paste into your Linear.</span>
      <h3 className="learnMore">
        Learn more <a href="https://github.com/alii/linear-style/blob/main/README.md">here.</a>
      </h3>
      <label>
        Tip: Search for "light" or "dark".
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder={"Search for themes.."}
        />
      </label>
      <ThemeCardGrid>
        {filtered.map(theme => {
          return <Theme key={JSON.stringify(theme)} theme={theme} />;
        })}
      </ThemeCardGrid>
    </div>
  );
}
