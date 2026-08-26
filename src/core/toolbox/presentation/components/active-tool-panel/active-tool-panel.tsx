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
import { Bip39Panel } from '@/core/toolbox/presentation/components/tool-panels/bip39/bip39-panel';
import { RsaKeypairPanel } from '@/core/toolbox/presentation/components/tool-panels/rsa-keypair/rsa-keypair-panel';
import { IpRangePanel } from '@/core/toolbox/presentation/components/tool-panels/ip-range/ip-range-panel';
import { MacGeneratorPanel } from '@/core/toolbox/presentation/components/tool-panels/mac-generator/mac-generator-panel';
import { MacLookupPanel } from '@/core/toolbox/presentation/components/tool-panels/mac-lookup/mac-lookup-panel';
import { Ipv6UlaPanel } from '@/core/toolbox/presentation/components/tool-panels/ipv6-ula/ipv6-ula-panel';
import { MathEvaluatorPanel } from '@/core/toolbox/presentation/components/tool-panels/math-evaluator/math-evaluator-panel';
import { PercentagePanel } from '@/core/toolbox/presentation/components/tool-panels/percentage/percentage-panel';
import { EtaPanel } from '@/core/toolbox/presentation/components/tool-panels/eta/eta-panel';
import { TemperaturePanel } from '@/core/toolbox/presentation/components/tool-panels/temperature/temperature-panel';
import { WifiQrPanel } from '@/core/toolbox/presentation/components/tool-panels/wifi-qr/wifi-qr-panel';
import { SvgPlaceholderPanel } from '@/core/toolbox/presentation/components/tool-panels/svg-placeholder/svg-placeholder-panel';
import { UrlParserPanel } from '@/core/toolbox/presentation/components/tool-panels/url-parser/url-parser-panel';
import { BasicAuthPanel } from '@/core/toolbox/presentation/components/tool-panels/basic-auth/basic-auth-panel';
import { MetaTagsPanel } from '@/core/toolbox/presentation/components/tool-panels/meta-tags/meta-tags-panel';
import { MimeTypesPanel } from '@/core/toolbox/presentation/components/tool-panels/mime-types/mime-types-panel';
import { KeycodePanel } from '@/core/toolbox/presentation/components/tool-panels/keycode/keycode-panel';
import { UserAgentPanel } from '@/core/toolbox/presentation/components/tool-panels/user-agent/user-agent-panel';
import { SafelinkPanel } from '@/core/toolbox/presentation/components/tool-panels/safelink/safelink-panel';
import { DeviceInfoPanel } from '@/core/toolbox/presentation/components/tool-panels/device-info/device-info-panel';
import { RandomPortPanel } from '@/core/toolbox/presentation/components/tool-panels/random-port/random-port-panel';
import { EmailNormalizerPanel } from '@/core/toolbox/presentation/components/tool-panels/email-normalizer/email-normalizer-panel';

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
    case ToolId.Bip39:
      return <Bip39Panel t={t} onCopy={onCopy} />;
    case ToolId.RsaKeypair:
      return <RsaKeypairPanel t={t} onCopy={onCopy} />;
    case ToolId.IpRange:
      return <IpRangePanel t={t} />;
    case ToolId.MacGenerator:
      return <MacGeneratorPanel t={t} onCopy={onCopy} />;
    case ToolId.MacLookup:
      return <MacLookupPanel t={t} />;
    case ToolId.Ipv6Ula:
      return <Ipv6UlaPanel t={t} onCopy={onCopy} />;
    case ToolId.MathEvaluator:
      return <MathEvaluatorPanel t={t} onCopy={onCopy} />;
    case ToolId.Percentage:
      return <PercentagePanel t={t} />;
    case ToolId.Eta:
      return <EtaPanel t={t} />;
    case ToolId.Temperature:
      return <TemperaturePanel t={t} />;
    case ToolId.WifiQr:
      return <WifiQrPanel t={t} />;
    case ToolId.SvgPlaceholder:
      return <SvgPlaceholderPanel t={t} />;
    case ToolId.UrlParser:
      return <UrlParserPanel t={t} />;
    case ToolId.BasicAuth:
      return <BasicAuthPanel t={t} onCopy={onCopy} />;
    case ToolId.MetaTags:
      return <MetaTagsPanel t={t} onCopy={onCopy} />;
    case ToolId.MimeTypes:
      return <MimeTypesPanel t={t} />;
    case ToolId.Keycode:
      return <KeycodePanel t={t} />;
    case ToolId.UserAgent:
      return <UserAgentPanel t={t} />;
    case ToolId.Safelink:
      return <SafelinkPanel t={t} onCopy={onCopy} />;
    case ToolId.DeviceInfo:
      return <DeviceInfoPanel t={t} />;
    case ToolId.RandomPort:
      return <RandomPortPanel t={t} onCopy={onCopy} />;
    case ToolId.EmailNormalizer:
      return <EmailNormalizerPanel t={t} onCopy={onCopy} />;
  }
}
