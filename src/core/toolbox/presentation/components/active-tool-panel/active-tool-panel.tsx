import type { ToolId } from '@/core/toolbox/domain/tool.types';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';
import { CasePanel } from '@/core/toolbox/presentation/components/tool-panels/case/case-panel';
import { SlugPanel } from '@/core/toolbox/presentation/components/tool-panels/slug/slug-panel';
import { LoremPanel } from '@/core/toolbox/presentation/components/tool-panels/lorem/lorem-panel';
import { RegexPanel } from '@/core/toolbox/presentation/components/tool-panels/regex/regex-panel';
import { JsonPanel } from '@/core/toolbox/presentation/components/tool-panels/json/json-panel';
import { YamlPanel } from '@/core/toolbox/presentation/components/tool-panels/yaml/yaml-panel';
import { Base64Panel } from '@/core/toolbox/presentation/components/tool-panels/base64/base64-panel';
import { UrlPanel } from '@/core/toolbox/presentation/components/tool-panels/url/url-panel';
import { HtmlPanel } from '@/core/toolbox/presentation/components/tool-panels/html/html-panel';
import { JwtPanel } from '@/core/toolbox/presentation/components/tool-panels/jwt/jwt-panel';
import { HashPanel } from '@/core/toolbox/presentation/components/tool-panels/hash/hash-panel';
import { UuidPanel } from '@/core/toolbox/presentation/components/tool-panels/uuid/uuid-panel';
import { PasswordPanel } from '@/core/toolbox/presentation/components/tool-panels/password/password-panel';
import { CrontabPanel } from '@/core/toolbox/presentation/components/tool-panels/crontab/crontab-panel';
import { TimestampPanel } from '@/core/toolbox/presentation/components/tool-panels/timestamp/timestamp-panel';
import { ColorPanel } from '@/core/toolbox/presentation/components/tool-panels/color/color-panel';
import { SubnetPanel } from '@/core/toolbox/presentation/components/tool-panels/subnet/subnet-panel';

export function ActiveToolPanel({
  activeTool,
  t,
  onCopy,
}: {
  activeTool: ToolId;
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  switch (activeTool) {
    case 'case':
      return <CasePanel t={t} onCopy={onCopy} />;
    case 'slug':
      return <SlugPanel t={t} onCopy={onCopy} />;
    case 'lorem':
      return <LoremPanel t={t} onCopy={onCopy} />;
    case 'regex':
      return <RegexPanel t={t} />;
    case 'json':
      return <JsonPanel t={t} onCopy={onCopy} />;
    case 'yaml':
      return <YamlPanel t={t} onCopy={onCopy} />;
    case 'base64':
      return <Base64Panel t={t} onCopy={onCopy} />;
    case 'url':
      return <UrlPanel t={t} onCopy={onCopy} />;
    case 'html':
      return <HtmlPanel t={t} onCopy={onCopy} />;
    case 'jwt':
      return <JwtPanel t={t} />;
    case 'hash':
      return <HashPanel t={t} onCopy={onCopy} />;
    case 'uuid':
      return <UuidPanel t={t} onCopy={onCopy} />;
    case 'password':
      return <PasswordPanel t={t} onCopy={onCopy} />;
    case 'crontab':
      return <CrontabPanel t={t} onCopy={onCopy} />;
    case 'timestamp':
      return <TimestampPanel t={t} onCopy={onCopy} />;
    case 'color':
      return <ColorPanel t={t} onCopy={onCopy} />;
    case 'subnet':
      return <SubnetPanel t={t} />;
  }
}
