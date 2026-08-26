import { ToolId } from '@/core/toolbox/domain/tool.types';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';
import { CasePanel } from '@/core/toolbox/presentation/components/tool-panels/case/case-panel';
import { SlugPanel } from '@/core/toolbox/presentation/components/tool-panels/slug/slug-panel';
import { LoremPanel } from '@/core/toolbox/presentation/components/tool-panels/lorem/lorem-panel';
import { RegexPanel } from '@/core/toolbox/presentation/components/tool-panels/regex/regex-panel';
import { TextDiffPanel } from '@/core/toolbox/presentation/components/tool-panels/text-diff/text-diff-panel';
import { NumeronymPanel } from '@/core/toolbox/presentation/components/tool-panels/numeronym/numeronym-panel';
import { TextStatsPanel } from '@/core/toolbox/presentation/components/tool-panels/text-stats/text-stats-panel';
import { NatoPanel } from '@/core/toolbox/presentation/components/tool-panels/nato/nato-panel';
import { JsonPanel } from '@/core/toolbox/presentation/components/tool-panels/json/json-panel';
import { JsonDiffPanel } from '@/core/toolbox/presentation/components/tool-panels/json-diff/json-diff-panel';
import { YamlPanel } from '@/core/toolbox/presentation/components/tool-panels/yaml/yaml-panel';
import { JsonCsvPanel } from '@/core/toolbox/presentation/components/tool-panels/json-csv/json-csv-panel';
import { Base64Panel } from '@/core/toolbox/presentation/components/tool-panels/base64/base64-panel';
import { UrlPanel } from '@/core/toolbox/presentation/components/tool-panels/url/url-panel';
import { HtmlPanel } from '@/core/toolbox/presentation/components/tool-panels/html/html-panel';
import { JwtPanel } from '@/core/toolbox/presentation/components/tool-panels/jwt/jwt-panel';
import { HashPanel } from '@/core/toolbox/presentation/components/tool-panels/hash/hash-panel';
import { UuidPanel } from '@/core/toolbox/presentation/components/tool-panels/uuid/uuid-panel';
import { UlidPanel } from '@/core/toolbox/presentation/components/tool-panels/ulid/ulid-panel';
import { PasswordPanel } from '@/core/toolbox/presentation/components/tool-panels/password/password-panel';
import { TotpPanel } from '@/core/toolbox/presentation/components/tool-panels/totp/totp-panel';
import { CrontabPanel } from '@/core/toolbox/presentation/components/tool-panels/crontab/crontab-panel';
import { QrPanel } from '@/core/toolbox/presentation/components/tool-panels/qr/qr-panel';
import { TimestampPanel } from '@/core/toolbox/presentation/components/tool-panels/timestamp/timestamp-panel';
import { ColorPanel } from '@/core/toolbox/presentation/components/tool-panels/color/color-panel';
import { BasePanel } from '@/core/toolbox/presentation/components/tool-panels/base/base-panel';
import { ChmodPanel } from '@/core/toolbox/presentation/components/tool-panels/chmod/chmod-panel';
import { IbanPanel } from '@/core/toolbox/presentation/components/tool-panels/iban/iban-panel';
import { RomanPanel } from '@/core/toolbox/presentation/components/tool-panels/roman/roman-panel';
import { SubnetPanel } from '@/core/toolbox/presentation/components/tool-panels/subnet/subnet-panel';
import { HttpStatusPanel } from '@/core/toolbox/presentation/components/tool-panels/http-status/http-status-panel';
import { IpAddressPanel } from '@/core/toolbox/presentation/components/tool-panels/ip-address/ip-address-panel';
import { CypherPanel } from '@/core/toolbox/presentation/components/tool-panels/cypher/cypher-panel';
import { BcryptPanel } from '@/core/toolbox/presentation/components/tool-panels/bcrypt/bcrypt-panel';
import { HmacPanel } from '@/core/toolbox/presentation/components/tool-panels/hmac/hmac-panel';
import { PasswordStrengthPanel } from '@/core/toolbox/presentation/components/tool-panels/password-strength/password-strength-panel';

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
    case ToolId.Case:
      return <CasePanel t={t} onCopy={onCopy} />;
    case ToolId.Slug:
      return <SlugPanel t={t} onCopy={onCopy} />;
    case ToolId.Lorem:
      return <LoremPanel t={t} onCopy={onCopy} />;
    case ToolId.Regex:
      return <RegexPanel t={t} />;
    case ToolId.TextDiff:
      return <TextDiffPanel t={t} />;
    case ToolId.Numeronym:
      return <NumeronymPanel t={t} onCopy={onCopy} />;
    case ToolId.TextStats:
      return <TextStatsPanel t={t} />;
    case ToolId.Nato:
      return <NatoPanel t={t} onCopy={onCopy} />;
    case ToolId.Json:
      return <JsonPanel t={t} onCopy={onCopy} />;
    case ToolId.JsonDiff:
      return <JsonDiffPanel t={t} />;
    case ToolId.Yaml:
      return <YamlPanel t={t} onCopy={onCopy} />;
    case ToolId.JsonCsv:
      return <JsonCsvPanel t={t} onCopy={onCopy} />;
    case ToolId.Base64:
      return <Base64Panel t={t} onCopy={onCopy} />;
    case ToolId.Url:
      return <UrlPanel t={t} onCopy={onCopy} />;
    case ToolId.Html:
      return <HtmlPanel t={t} onCopy={onCopy} />;
    case ToolId.Jwt:
      return <JwtPanel t={t} />;
    case ToolId.Hash:
      return <HashPanel t={t} onCopy={onCopy} />;
    case ToolId.Uuid:
      return <UuidPanel t={t} onCopy={onCopy} />;
    case ToolId.Ulid:
      return <UlidPanel t={t} onCopy={onCopy} />;
    case ToolId.Password:
      return <PasswordPanel t={t} onCopy={onCopy} />;
    case ToolId.Totp:
      return <TotpPanel t={t} onCopy={onCopy} />;
    case ToolId.Crontab:
      return <CrontabPanel t={t} onCopy={onCopy} />;
    case ToolId.Qr:
      return <QrPanel t={t} />;
    case ToolId.Timestamp:
      return <TimestampPanel t={t} onCopy={onCopy} />;
    case ToolId.Color:
      return <ColorPanel t={t} onCopy={onCopy} />;
    case ToolId.Base:
      return <BasePanel t={t} onCopy={onCopy} />;
    case ToolId.Chmod:
      return <ChmodPanel t={t} onCopy={onCopy} />;
    case ToolId.Iban:
      return <IbanPanel t={t} />;
    case ToolId.Roman:
      return <RomanPanel t={t} onCopy={onCopy} />;
    case ToolId.Subnet:
      return <SubnetPanel t={t} />;
    case ToolId.HttpStatus:
      return <HttpStatusPanel t={t} />;
    case ToolId.IpAddress:
      return <IpAddressPanel t={t} onCopy={onCopy} />;
    case ToolId.Cypher:
      return <CypherPanel t={t} onCopy={onCopy} />;
    case ToolId.Bcrypt:
      return <BcryptPanel t={t} onCopy={onCopy} />;
    case ToolId.Hmac:
      return <HmacPanel t={t} onCopy={onCopy} />;
    case ToolId.PasswordStrength:
      return <PasswordStrengthPanel t={t} />;
  }
}
